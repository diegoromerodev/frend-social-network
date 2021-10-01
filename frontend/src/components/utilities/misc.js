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
`;

export const StyledIcon = styled.i`
  color: ${lighter};
`;
