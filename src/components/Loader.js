import React from "react";
import styled from "styled-components";
import { CubeGrid } from "styled-spinkit";
import { Layout } from "antd";
const Loader = styled.div`
  margin-top: 14rem;
`;
const loader = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Loader>
          <CubeGrid size={70} />
        </Loader>
      </Layout>
    </>
  );
};
export default loader;
