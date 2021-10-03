import styled from "styled-components";
import { blue, dark, white } from "./colors";

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

const BigLogo = styled.h2`
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
    animation-delay: 0.3s;
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

export { LoginBody, BigLogo, BigBall };
