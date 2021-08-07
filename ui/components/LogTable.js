import { Table } from "antd";
import Args from "./Args";
import ExpandIcon from "./ExpandIcon";

const columns = [
  {
    title: "ID",
    dataIndex: "logId",
  },
  {
    title: "Type",
    dataIndex: "logType",
  },
];

export default function EventTable(props) {
  console.log(props.dataSource);
  return (
    <Table
      columns={columns}
      rowKey="logId"
      expandIconColumnIndex={Number.MAX_SAFE_INTEGER}
      expandIcon={ExpandIcon}
      expandable={{
        expandedRowRender: record => <Args args={
          record.data.map((item, index) => ({ name: index + 1, value: item }))
        } />
      }}
      {...props} />
  );
}