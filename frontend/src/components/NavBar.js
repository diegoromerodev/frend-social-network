import React from "react";
import styled from "styled-components";
import { light, mild, white } from "./utilities/colors";
import { RegularButton } from "./utilities/FormElements";
import { ImageForContainer, StyledIcon } from "./utilities/Misc";
import { CircleContainer, FlexContainer } from "./utilities/SpaceContainers";

const Logo = styled.h2`
  font-family: "Libre Franklin", sans-serif;
  font-weight: 700;
  color: ${white};
  font-size: 3rem;
  font-style: italic;
  text-shadow: 0.1rem 0.1rem 0 ${mild}2d;
  text-align: center;
`;

const Bar = styled.nav`
  position: fixed;
  padding: 0.2rem 2rem;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${mild};
  border-bottom: 1px solid ${light};
`;

const MenuContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default () => {
  return (
    <Bar>
      <MenuContent>
        <Logo>frends</Logo>
        <FlexContainer className="padd-0">
          <RegularButton className="transparent no-grow">
            <StyledIcon className="fa-solid fa-bell large" />
          </RegularButton>
          <RegularButton className="transparent no-grow">
            <StyledIcon className="fa-solid fa-message large" />
          </RegularButton>
          <CircleContainer>
            <ImageForContainer src="https://i.pinimg.com/564x/ed/02/62/ed02622c207a5b4b4d9acb065b44b55f.jpg" />
          </CircleContainer>
          <RegularButton className="transparent no-grow">
            <StyledIcon className="fa-solid fa-ellipsis-vertical" />
          </RegularButton>
        </FlexContainer>
      </MenuContent>
    </Bar>
  );
};
