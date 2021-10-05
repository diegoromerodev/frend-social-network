import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import performSearch from "../../lib/performSearch";
import { blue, lightBlue } from "../utilities/colors";
import {
  FormFlexContainer,
  RegularButton,
  SquaredInput,
} from "../utilities/FormElements";
import { StyledIcon } from "../utilities/Misc";
import { PostWrapper } from "../utilities/postElements";
import {
  FlexColumnGrowElementCenter,
  FlexContainer,
} from "../utilities/SpaceContainers";
import PostResult from "./PostResult";
import UserResult from "./UserResult";

export const Highlighter = styled.span`
  position: relative;
  z-index: 1;
`;

export const HighlightWrapper = styled.span`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 110%;
    height: 110%;
    left: -5%;
    top: -5%;
    background-color: ${blue};
    z-index: 0;
    border-radius: 0.5rem;
  }
`;

export const highlight = (value, sentQuery) => {
  if (!value || !sentQuery) return value;
  const regexForQuery = new RegExp(`(\\s)?(${sentQuery})(\\s)?`, "gi");
  const allMatches = value.split(regexForQuery).reduce((acc, curr) => {
    let item = curr;
    if (!curr) return acc;
    if (regexForQuery.test(curr)) {
      item = (
        <HighlightWrapper>
          <Highlighter>{curr}</Highlighter>
        </HighlightWrapper>
      );
    }
    acc.push(item);
    return acc;
  }, []);
  return allMatches;
};

export default () => {
  const [debounce, setDebounce] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundPosts, setFoundPosts] = useState([]);
  const [query, setQuery] = useState("");
  const session = useSelector((state) => state.session.value);
  const handleChange = (e) => {
    if (debounce) clearTimeout(debounce);
    if (e.target.value.length < 3) return;
    const timerId = setTimeout(() => {
      createSearch(session.token, e.target.value);
    }, 1000);
    setDebounce(timerId);
  };
  const createSearch = (token, query) => {
    performSearch(token, query).then((results) => {
      setFoundUsers(results.users);
      setFoundPosts(results.posts);
      setQuery(query);
    });
  };
  return (
    <PostWrapper className="transparent">
      <FormFlexContainer>
        <FlexContainer className="padd-0">
          <FlexColumnGrowElementCenter>
            <SquaredInput
              onChange={handleChange}
              placeholder="What are you looking for?"
            />
          </FlexColumnGrowElementCenter>
          <RegularButton className="blue no-grow">
            <StyledIcon className="fa-solid fa-magnifying-glass white" />
          </RegularButton>
        </FlexContainer>
      </FormFlexContainer>
      {foundUsers.map((user) => (
        <UserResult user={user} query={query} />
      ))}
      {foundPosts.map((post) => (
        <PostResult post={post} query={query} />
      ))}
    </PostWrapper>
  );
};
