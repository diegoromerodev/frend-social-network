import styled from "styled-components";
import {
  blue,
  darkRed,
  light,
  lightBlue,
  lighter,
  mild,
  milder,
  red,
  white,
} from "./colors";

export const RoundedInputButton = styled.button`
  flex-grow: 1;
  padding: 0.3em 1em;
  border-radius: 5em;
  background-color: ${milder};
  display: block;
  font-size: 1.2em;
  width: 100%;
  text-align: left;
  color: ${lighter};
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s ease-out;
  transition-property: filter, background-color;
  :hover {
    transition: none;
    background-color: ${light};
  }
`;

export const RoundedInputField = styled.input`
  flex-grow: 1;
  padding: 0.9rem 1rem;
  border-radius: 5em;
  background-color: ${milder};
  display: block;
  transition: all 0.2s ease-out;
  transition-property: filter, background-color;
  ::placeholder,
  & {
    color: ${lighter};
    font-weight: 400;
    font-size: 1.1rem;
  }
  :hover,
  :active {
    transition: none;
    background-color: ${light};
  }
`;

export const RegularButton = styled.button`
  flex-grow: 1;
  flex-shrink: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.5em 1.5em;
  cursor: pointer;
  background-color: ${white};
  filter: brightness(1);
  transition: all 0.2s ease-out;
  transition-property: filter, background-color;
  font-weight: 500;
  :hover {
    transition: none;
    filter: brightness(0.8);
  }
  &.half-p {
    width: 50%;
  }
  &.blue {
    background-color: ${blue};
    border: 2px solid ${lightBlue};
    color: ${white};
    :hover {
      filter: brightness(1.2);
    }
  }
  &.red {
    background-color: ${red};
    color: ${white};
    border: 2px solid ${darkRed};
    :hover {
      filter: brightness(0.8);
    }
  }
  &.transparent {
    border: 2px solid ${light};
    background-color: ${milder};
    color: ${lighter};
    :hover,
    &.selected {
      filter: brightness(1);
      background-color: ${light};
    }
  }
  &.no-grow {
    flex-grow: 0;
  }
  @media only screen and (-webkit-min-device-pixel-ratio: 3),
    only screen and (min--moz-device-pixel-ratio: 3),
    only screen and (-o-min-device-pixel-ratio: 3/1),
    only screen and (min-device-pixel-ratio: 3) {
    padding: 1rem;
  }
`;

export const FormFlexContainer = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${mild};
  padding: 1rem;
  gap: 1rem;
`;

export const SquaredInput = styled.input`
  border-radius: 0.5rem;
  background-color: ${milder};
  padding: 1rem;
  font-size: 1.5rem;
  color: ${lighter};
  font-weight: 400;
  ::placeholder {
    font-size: 1.5rem;
    color: ${lighter};
    font-weight: 300;
  }
`;

export const SquaredTextArea = styled.textarea`
  border-radius: 0.5rem;
  background-color: ${milder};
  padding: 1rem;
  font-size: 1.5rem;
  color: ${lighter};
  font-weight: 400;
  min-height: 10rem;
  ::placeholder {
    font-size: 1.5rem;
    color: ${lighter};
    font-weight: 300;
  }
`;
