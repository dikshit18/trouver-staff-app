import React, { useEffect } from "react";
import { Row, Col, Layout, Steps, Card } from "antd";
import styled from "styled-components";
import SideKick from "./SideKick";
const { Header, Content, Footer } = Layout;
const { Step } = Steps;
const HeaderStyle = {
  backgroundColor: "#fff",
  width: "100%",
  top: 0
};
const StyledSteps = styled(Steps)`
  width: 60%;
  margin: auto;
  margin-top: 3rem;
`;
const DetailsCard = styled(Card)`
  margin: 0 auto;
  margin-top: 7rem;
  margin-left: 2.5rem;
`;

const Order = props => {
  const { orderDetails } = props;

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
            <Col sm={24} xs={1}>
              <StyledSteps
                current={orderDetails && Order.stage ? orderDetails.stage : 1}
                progressDot
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

          <Row gutter={[16, 16]}>
            <Col span={16}>
              <DetailsCard style={{ width: "50rem" }}>
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
              </DetailsCard>
            </Col>
            <Col span={8}>
              <DetailsCard style={{ width: "20rem" }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </DetailsCard>
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default Order;
