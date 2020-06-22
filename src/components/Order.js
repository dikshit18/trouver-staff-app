import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Layout,
  Steps,
  Card,
  Form,
  Select,
  Switch,
  Button,
  List,
  Typography
} from "antd";
import styled from "styled-components";
import SideKick from "./SideKick";
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Step } = Steps;
const { Text } = Typography;
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
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
const Order = props => {
  const [transitionState, setTransitionState] = useState(false);
  const { orderDetails, transitionHandler } = props;
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };
  const options =
    orderDetails &&
    orderDetails.warehouseDropdown &&
    orderDetails.warehouseDropdown.map((wareHouse, index) => {
      return <Option key={index}>{wareHouse}</Option>;
    });

  const ordersCard = (
    <>
      {orderDetails &&
        orderDetails.productDetails &&
        orderDetails.productDetails.map((product, index) => {
          return (
            <>
              <Card
                key={index}
                title={index === 0 ? "Product Details" : undefined}
                style={{ margin: "auto", width: "90%" }}
              >
                <List>
                  <Row>
                    <Col span={12}>
                      <Text>Order ID</Text>
                    </Col>
                    <Col span={12}>{orderDetails && orderDetails.orderId}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text>Product ID</Text>
                    </Col>
                    <Col span={12}>{product.productId}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text>Item </Text>
                    </Col>
                    <Col span={12}>{product.name}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text>Label</Text>
                    </Col>
                    <Col span={12}>{product.label}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text>Quantity</Text>
                    </Col>
                    <Col span={12}>{product.quantity}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text>Address</Text>
                    </Col>
                    <Col span={12}>
                      {orderDetails &&
                        `${orderDetails.orderDetails.address.line1} ${orderDetails.orderDetails.address.line2} ${orderDetails.orderDetails.address.line3}`}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text>Phone Number</Text>
                    </Col>
                    <Col span={12}>
                      {orderDetails && orderDetails.orderDetails.phoneNumber}
                    </Col>
                  </Row>
                </List>
              </Card>
            </>
          );
        })}
    </>
  );
  useEffect(() => {
    //For switch on/off
    if (orderDetails && orderDetails.transition === "on") {
      setTransitionState(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionState, orderDetails]);
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
                current={
                  orderDetails && orderDetails.currentLocation
                    ? orderDetails.warehouse.indexOf(
                        orderDetails.currentLocation
                      )
                    : 1
                }
              >
                {orderDetails &&
                orderDetails.warehouse &&
                orderDetails.warehouse.length
                  ? orderDetails.warehouse.map((order, index) => {
                      return <Step key={index} title={order} />;
                    })
                  : ""}
              </StyledSteps>
            </Col>
          </Row>
          <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
            <Form.Item name="startTransition" label="Tranisition">
              <Switch
                checked={transitionState}
                disabled={transitionState}
                onClick={event => {
                  setTransitionState(true);
                  transitionHandler(event);
                }}
              />
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
                <List
                  itemLayout="horizontal"
                  dataSource={!orderDetails ? [] : orderDetails.history}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.description}
                        description={item.timestamp}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} lg={16} md={16}>
              {ordersCard}
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default Order;
