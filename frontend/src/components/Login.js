import React from "react";
import styled from "styled-components";
import { blue, dark, white } from "./utilities/colors";
import { RegularButton } from "./utilities/FormElements";
import { FlexColumnGrowElementCenter } from "./utilities/SpaceContainers";

const LoginBody = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${dark};
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: " ";
    position: fixed;
    pointer-events: none;
    background: url("https://www.transparenttextures.com/patterns/dark-denim-3.png");
    z-index: 1;
  }
`;

const Logo = styled.h2`
  font-family: "Libre Franklin", sans-serif;
  font-weight: 700;
  color: ${white};
  font-size: 20vw;
  font-style: italic;
  text-align: center;
  position: relative;
`;

const BigBall = styled.div`
  background-color: ${blue};
  border-radius: 50%;
  width: 50vmax;
  height: 50vmax;
  position: absolute;
  right: -30px;
  transform: translateX(50%);
  z-index: 0;
  filter: blur(40px);
  opacity: 0.3;
  animation: subtle 3s ease infinite alternate;
  &.delay {
    animation-delay: 0.1s;
  }

  @keyframes subtle {
    from {
      transform: translateX(0%) translateY(-100%);
    }
    to {
      transform: translateX(0%) translateY(100%);
    }
  }
`;

export default () => {
  return (
    <LoginBody>
      <FlexColumnGrowElementCenter className="center transparent gap-y">
        <BigBall />
        <BigBall className="delay" />
        <Logo>frends</Logo>
        <RegularButton
          className="half-p blue no-grow large"
          style={{ position: "relative", zIndex: 1 }}
        >
          Facebook login
        </RegularButton>
        <RegularButton
          className="half-p no-grow"
          style={{ position: "relative", zIndex: 1 }}
        >
          Guest login
        </RegularButton>
      </FlexColumnGrowElementCenter>
    </LoginBody>
  );
};
