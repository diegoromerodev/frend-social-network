import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import {
  CircleContainer,
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "./SpaceContainers";
import { ImageForContainer, StyledIcon, StyledRegularP } from "./Misc";
import { lighter, mild, white } from "./colors";

export const PostImage = styled.img`
  max-height: 50vh;
  width: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const PostLink = styled(Link)`
  width: 100%;
  max-height: 50vh;
  display: block;
  overflow: hidden;
  position: relative;
  ::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: url(${(props) => props.image}) no-repeat center/cover;
    z-index: 0;
    filter: blur(1em);
    transform: scale(110%);
  }
`;

export const BoldRegularLink = styled(Link)`
  color: ${white};
  font-weight: 500;
  text-decoration: none;
`;

export const PostHeader = ({ image, username, date, heading }) => {
  return (
    <FlexContainer className="center-y">
      <CircleContainer>
        <ImageForContainer src={image} />
      </CircleContainer>
      <FlexColumnGrowElementCenter>
        <FlexContainer className="padd-0 baseline-y gap-x-half">
          <BoldRegularLink>{username}</BoldRegularLink>
          <StyledRegularP>{heading && ` is feeling ${heading}`}</StyledRegularP>
        </FlexContainer>
        <StyledRegularP className="grey">{date}</StyledRegularP>
      </FlexColumnGrowElementCenter>
      <StyledIcon className="fa-solid fa-ellipsis-vertical" />
    </FlexContainer>
  );
};

export const PostWrapper = styled.div`
  margin: 1em 1em;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const LikesContainer = styled.div`
  color: ${lighter};
`;

export const PostBody = styled(Link)`
  color: ${white};
  display: block;
  font-size: 1.5rem;
  text-decoration: none;
  padding: 1rem 1rem;
  background-color: ${mild};
  word-break: break-word;
`;
