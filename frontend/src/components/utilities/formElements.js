import styled from "styled-components";
import { blue, light, lighter, mild, milder, white } from "./colors";

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
  padding: 5px;
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
  &.blue {
    background-color: ${blue};
    color: ${white};
    :hover {
      filter: brightness(1.2);
    }
  }
  &.transparent {
    background-color: transparent;
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
`;

export const FormFlexContainer = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: ${mild};
  padding: 1rem;
  gap: 1rem;
`;
