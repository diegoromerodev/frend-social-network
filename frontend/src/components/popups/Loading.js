import React from "react";
import { Grid } from "react-loading-icons";
import styled from "styled-components";
import { blue, lighter, mild, milder } from "../utilities/colors";

const LoadWrapper = styled.div`
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: ${mild};
  margin: 0 auto;
  display: inline-block;
`;

export default () => {
  return (
    <LoadWrapper>
      <Grid fill={blue} />
    </LoadWrapper>
  );
};
