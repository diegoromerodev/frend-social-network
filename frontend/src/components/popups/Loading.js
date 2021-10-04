import React from "react";
import { Grid } from "react-loading-icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { blue, dark } from "../utilities/colors";

const LoadWrapper = styled.div`
  border-radius: 0.5rem;
  padding: 2rem;
  background-color: ${dark};
  display: inline-block;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.09, 0.59, 0.18, 1.19);
  &.active {
    transform: scale(1);
  }
`;

export const FullContFlex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 4;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: ${dark}b3;
  transition: all 0.3s cubic-bezier(0.09, 0.59, 0.18, 1.19);
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: all;
  }
`;

export default () => {
  const loading = useSelector((state) => state.loading.value);

  return (
    <FullContFlex className={loading && "active"}>
      <LoadWrapper className={loading && "active"}>
        <Grid fill={blue} />
      </LoadWrapper>
    </FullContFlex>
  );
};
