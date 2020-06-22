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
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber"
  },
  {
    title: "Current Location",
    dataIndex: "currentLocation",
    sorter: (a, b) => a.currentLocation.length - b.currentLocation.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"]
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
          dataSource={!props.orders ? [] : props.orders}
          onChange={onChange}
          loading={props.isLoadingOrders}
        />
      </Col>
      <Col xs={0} sm={0} lg={1} md={1}></Col>
    </Row>
  );
};
export default usersTable;
