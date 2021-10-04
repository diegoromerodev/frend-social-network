import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { light, mild, white } from "./utilities/colors";
import { RegularButton, RoundedInputButton } from "./utilities/FormElements";
import { ImageForContainer, StyledIcon } from "./utilities/Misc";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./utilities/SpaceContainers";
import { BoldRegularLink } from "./utilities/postElements";

const Logo = styled(Link)`
  font-family: "Libre Franklin", sans-serif;
  font-weight: 700;
  color: ${white};
  font-size: 3rem;
  font-style: italic;
  text-shadow: 0.1rem 0.1rem 0 ${mild}2d;
  text-align: center;
  text-decoration: none;
`;

const Bar = styled.nav`
  position: fixed;
  padding: 0.4rem 2rem;
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
  .nav-size {
    padding: 0.6rem 1rem;
    margin-left: 1rem;
  }
`;

const Spacer = styled.div`
  height: ${(props) => props.height}px;
  margin-bottom: 1rem;
`;

export default () => {
  const navBarRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(navBarRef.current.offsetHeight);
  }, []);
  const session = useSelector((state) => state.session.value);
  return (
    <>
      <Bar ref={navBarRef}>
        <MenuContent>
          <Logo to="/">frends</Logo>
          <FlexColumnGrowElementCenter>
            <BoldRegularLink to="/search">
              <RoundedInputButton className="nav-size mobile-hidden">
                <FlexContainer className="invert padd-0 transparent">
                  <StyledIcon className="fa-solid fa-magnifying-glass large" />
                  <span className="mobile-hidden">Search for...</span>
                </FlexContainer>
              </RoundedInputButton>
            </BoldRegularLink>
          </FlexColumnGrowElementCenter>
          <FlexContainer className="padd-0 center-y">
            <BoldRegularLink to="/search">
              <RegularButton className="transparent no-grow mobile-only">
                <StyledIcon className="fa-solid fa-magnifying-glass large" />
              </RegularButton>
            </BoldRegularLink>
            <BoldRegularLink to="/notifications">
              <RegularButton className="transparent no-grow">
                <StyledIcon className="fa-solid fa-bell large" />
              </RegularButton>
            </BoldRegularLink>
            <BoldRegularLink to="/chatrooms">
              <RegularButton className="transparent no-grow">
                <StyledIcon className="fa-solid fa-message large" />
              </RegularButton>
            </BoldRegularLink>
            <CircleContainer>
              <ImageForContainer src={session && session.user.profile_photo} />
            </CircleContainer>
          </FlexContainer>
        </MenuContent>
      </Bar>
      <Spacer height={height} />
    </>
  );
};
