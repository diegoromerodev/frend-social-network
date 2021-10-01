import styled from "styled-components";
import { blue, lighter, mild } from "./colors";

export const FlexContainer = styled.div`
  display: flex;
  &.transparent {
    background-color: transparent;
  }
  &.wrap {
    flex-wrap: wrap;
  }
  padding: 1em;
  gap: 0.2em 1em;
  background-color: ${mild};
  position: relative;
  &.center-y {
    align-items: center;
  }
  &.baseline-y {
    align-items: baseline;
  }
  &.spb-x {
    justify-content: space-between;
  }
  &.gap-x-half {
    gap: 0.2em 0.5em;
  }
  &.padd-x {
    padding: 0 2em;
  }
  &.padd-0 {
    padding: 0;
  }
  &.padd-1-2 {
    padding: 1em 2em;
  }
  &.scroll-x {
    overflow-x: scroll;
  }
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${mild};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${lighter};
    border-radius: 5px;
  }
  &.reversed {
    flex-flow: row-reverse;
  }
`;

export const WrapperContainer = styled.div`
  max-width: 1100px;
`;

export const CircleContainer = styled.div`
  flex-shrink: 0;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  overflow: hidden;
  border: 0.2em solid ${blue};
`;

export const FlexColumnGrowElementCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  &.center {
    align-items: center;
  }
  &.gap-y {
    gap: 0.5em;
  }
`;

export const BigContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  @media only screen and (-webkit-min-device-pixel-ratio: 3),
    only screen and (min--moz-device-pixel-ratio: 3),
    only screen and (-o-min-device-pixel-ratio: 3/1),
    only screen and (min-device-pixel-ratio: 3) {
    max-width: 1100px;
  }
`;
