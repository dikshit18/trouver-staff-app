import React from "react";
import {
  Row,
  Col,
  Layout,
  Steps,
  Card,
  Form,
  Select,
  Switch,
  Button
} from "antd";
import styled from "styled-components";
import SideKick from "./SideKick";
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Step } = Steps;
const HeaderStyle = {
  backgroundColor: "#fff",
  width: "100%",
  top: 0
};
const StyledSteps = styled(Steps)`
  width: 60%;
  margin: 0 auto;
  margin-top: 3rem;
`;

const warehousesInfo = ["Sonipat", "Panipat", "Karnal", "Kurukshetra"];
const options =
  warehousesInfo &&
  warehousesInfo.map((wareHouse, index) => {
    return <Option key={index}>{wareHouse}</Option>;
  });
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
const Order = props => {
  const { orderDetails } = props;
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };
  return (
    <Layout>
      <SideKick logout={props.logout} submit={props.submit} />
      <Layout className="site-layout">
        <Header
          style={{
            ...HeaderStyle
          }}
        >
          Order Details
        </Header>
        <Content
          style={{
            margin: "2rem 1rem",
            height: "100vh",
            backgroundColor: "#fff"
          }}
        >
          <Row>
            <Col sm={24} xs={24}>
              <StyledSteps
                current={orderDetails && Order.stage ? orderDetails.stage : 1}
              >
                <Step title="Warehouse" />
                <Step
                  title={orderDetails && orderDetails.source}
                  description="Origin"
                />
                {orderDetails &&
                orderDetails.location &&
                orderDetails.location.length
                  ? orderDetails.location.map((order, index) => {
                      return (
                        <Step
                          key={index}
                          title={Object.keys(order)[0]}
                          //description={order[Object.keys(order)[0]]}
                        />
                      );
                    })
                  : ""}
                <Step
                  title={orderDetails && orderDetails.destination}
                  description="Delivery Point"
                />
              </StyledSteps>
            </Col>
          </Row>
          <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
            <Form.Item
              name="startTransition"
              label="Start Tranisition"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="updateDestination"
              label="Update Destination"
              hasFeedback
              rules={[
                {
                  message: "Select next delivery warehouse.",
                  required: true
                }
              ]}
            >
              <Select placeholder="Please select next delivery warehouse.">
                {options}
              </Select>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Row style={{ width: "100%", marginTop: "1rem" }}>
            <Col xs={24} sm={24} lg={8} md={8}>
              <Card
                title="Delivery Status"
                style={{ width: "90%", margin: "auto" }}
              >
                <ul>
                  <li>Rahul has delivered the item to Sonipat at Timestamp</li>
                  <p>Card content</p>
                  <p>Card content</p>
                </ul>
              </Card>
            </Col>
            <Col xs={24} sm={24} lg={16} md={16}>
              <Card
                title="Order Details"
                style={{ margin: "auto", width: "90%" }}
              >
                <Row>
                  <Col span={12}>Order ID</Col>
                  <Col span={12}>{orderDetails && orderDetails.orderId}</Col>
                </Row>
                <Row>
                  <Col span={12}>Item Name</Col>
                  <Col span={12}>{orderDetails && orderDetails.orderId}</Col>
                </Row>
                <Row>
                  <Col span={12}>Label</Col>
                  <Col span={12}>{orderDetails && orderDetails.orderId}</Col>
                </Row>
                <Row>
                  <Col span={12}>Address</Col>
                  <Col span={12}>{orderDetails && orderDetails.orderId}</Col>
                </Row>
                <Row>
                  <Col span={12}>Phone Number</Col>
                  <Col span={12}>{orderDetails && orderDetails.orderId}</Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default Order;
