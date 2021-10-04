import styled from "styled-components";
import { lighter, milder, white } from "./colors";

export const ImageForContainer = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const Separator = styled.div`
  height: 1px;
  background: ${milder};
  flex: 1 1 100%;
`;

export const StyledRegularP = styled.p`
  font-size: 0.9rem;
  color: ${white};
  &.grey {
    color: ${lighter};
  }
  &.right-align {
    text-align: right;
  }
  &.large {
    font-size: 1.5rem;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 3),
    only screen and (min--moz-device-pixel-ratio: 3),
    only screen and (-o-min-device-pixel-ratio: 3/1),
    only screen and (min-device-pixel-ratio: 3) {
    font-size: 1rem;
    .large {
      font-size: 2rem;
    }
  }
`;

export const StyledIcon = styled.i`
  color: ${lighter};
  &.white {
    color: ${white};
  }
  &.large {
    font-size: 1.4rem;
  }
`;
