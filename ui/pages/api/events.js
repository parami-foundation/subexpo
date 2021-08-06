import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { current, pageSize, section, method, startDate, endDate } = req.query;
  const currentValue = parseInt(current) || 1;
  const pageSizeValue = parseInt(pageSize) || 20;
  const startDateValue = parseInt(startDate);
  const endDateValue = parseInt(endDate);
  const where = {};
  if (section) {
    where.section = section;
    if (method) where.method = method;
  }
  if (startDateValue) where.blockAt = { gte: startDateValue };
  if (endDateValue) {
    if (where.blockAt) {
      where.blockAt.lt = endDateValue;
    } else {
      where.blockAt = { lt: endDateValue };
    }
  }

  const [total, list] = await Promise.all(
    [
      prisma.chainEvent.count({ where }),
      prisma.chainEvent.findMany({
        where,
        select: {
          eventId: true,
          blockNum: true,
          extrinsicHash: true,
          blockAt: true,
          section: true,
          method: true,
          data: true,
        },
        orderBy: { blockNum: "desc" },
        skip: (currentValue - 1) * pageSizeValue,
        take: pageSizeValue,
      }),
    ],
  )
  res.json({total, list});
}