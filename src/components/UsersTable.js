import React from "react";
import "antd/dist/antd.css";
import { Table, Row, Col } from "antd";
import { Link } from "react-router-dom";
const TableStyle = {
  width: "100%",
  margin: "2rem auto"
};
const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    sorter: (a, b) => a.orderId.length - b.orderId.length,
    sortDirections: ["descend", "ascend"],
    render: text => <Link to={`/orders/${text}`}> {text} </Link>
  },
  {
    title: "Label",
    dataIndex: "label",
    sorter: (a, b) => a.label.length - b.label.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber"
  }
];

const data = [
  {
    orderId: "635b8f10-52a1-400b-8350-ebb85babe49d",
    label: "John Brown",
    phoneNumber: "+918950311221",
    address: "New York No. 1 Lake Park"
  },
  {
    orderId: "610e5235-8712-4b3a-8201-a0d8718e91b8",
    label: "Mark Zuck",
    phoneNumber: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    orderId: "ec153884-d4d1-496c-8aac-de79510285ed",
    label: "Semi Local",
    phoneNumber: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    orderId: "3a60eaef-2598-4e4e-b614-bd858d964906",
    label: "Dikshit Kathuria",
    phoneNumber: 32,
    address: "New York No. 1 Lake Park"
  }
];

function onChange(pagination, filters, sorter, extra) {}
const usersTable = props => {
  return (
    <Row>
      <Col xs={2} sm={0} lg={1} md={1}></Col>
      <Col xs={24} sm={24} lg={22} md={22}>
        <Table
          style={{ ...TableStyle }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </Col>
      <Col xs={0} sm={0} lg={1} md={1}></Col>
    </Row>
  );
};
export default usersTable;
