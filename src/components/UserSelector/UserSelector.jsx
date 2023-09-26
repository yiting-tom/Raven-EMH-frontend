import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BiFilter } from 'react-icons/bi';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
} from 'reactstrap';
import { styled } from 'styled-components';

import { fetchAllUsers } from 'api/feedback';
import { color } from 'style';

const UserSelectorContainer = styled.div`
  top: 30vh;
  width: 40vh;
  height: 12vh;
  text-align: center;
  margin: 0em auto;
  margin-bottom: 2em;
  border-radius: 1em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  padding: 1em;
`;

const SearchBar = styled(Input)`
  width: 100%;
  margin-bottom: 1em;
  padding: 8px 12px;
  border-radius: 1em 1em !important;
  color: white;
`;
export const FilterButton = styled(Button)`
  padding: 8px 12px;
  margin: 0 0 0 1em;
  border-radius: 1em;
  ${(props) =>
    props.$isToggle &&
    `
    border: 1px solid ${color.primary};
  `}
`;
const DropdownMenuContainer = styled(DropdownMenu)`
  width: 100%;
  max-height: 20vh;
  overflow-y: auto;
  margin: 0 auto;
  padding: 0;
  border-radius: 1em;
  display: none;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  .dropdown-menu:before {
    border-bottom: 0;
    visibility: hidden;
  }
  ${(props) =>
    !props.$inputIsFocused &&
    `
    visibility: hidden;
  `}
`;
const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${color.primary};
  }

  ${(props) =>
    props.$isFirst &&
    `
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
  `}

  ${(props) =>
    props.$isLast &&
    `
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
  `}

  ${(props) =>
    props.$isActive &&
    `
    border: 1px solid ${color.primary};
  `}
`;

const UserSelector = ({ setUserId, setCurIdx }) => {
  const [userList, setUserList] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownIsToggle, setDropdownIsToggle] = useState(false);
  const [filterIsToggle, setFilterIsToggle] = useState(false);

  const handleSubmit = () => {
    const selectedItem = results[activeIndex].item;
    setQuery(selectedItem.displayName);
    setUserId(selectedItem.localId);
    console.log('HandleSubmit:', selectedItem.localId);
    setActiveIndex(0);
    setResults([]);
    setDropdownIsToggle(false);
  };

  // Input keyboard event handler
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + results.length) % results.length,
      );
    } else if (
      e.key === 'Enter' &&
      activeIndex > -1 &&
      activeIndex < results.length
    ) {
      e.preventDefault();
      handleSubmit(e);
      if (document.activeElement) {
        document.activeElement.blur();
      }
    } else if (e.key === 'Escape') {
      if (document.activeElement) {
        document.activeElement.blur();
      }
      setDropdownIsToggle(false);
    }
  };

  // alt+i to focus on the input
  useHotkeys(
    'alt+i',
    () => {
      const realInput = document.getElementById('inputId');
      if (realInput) {
        realInput.focus();
        setCurIdx(0);
      }
      setDropdownIsToggle(true);
    },
    [query],
  );

  // esc to close the dropdown
  useHotkeys('esc', () => {
    setDropdownIsToggle(false);
  });

  // get all users from the backend
  useEffect(() => {
    // Fetch users from the backend
    const load = async () => {
      const data = await fetchAllUsers();
      setUserList(data);
      setFuse(
        new Fuse(data, {
          keys: ['displayName'],
          threshold: 0.4,
        }),
      );
    };
    load();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  useEffect(() => {
    fuse && userList && setResults(fuse.search(''));
  }, [fuse]);

  // update search results by Fuse when the query changes
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery && fuse && userList) {
      const searchResults = fuse.search(newQuery, { limit: 5 }).slice(0);
      searchResults.sort((a, b) => a.score - b.score);
      setResults(searchResults);
      setDropdownIsToggle(true);
    } else {
      setResults([]);
      setDropdownIsToggle(false);
    }
  };

  return (
    <UserSelectorContainer>
      <p color="#666">Search for a user to give feedbacks</p>
      <InputGroup width="100%">
        <SearchBar
          disabled={!userList}
          id="inputId"
          type="text"
          autoComplete="off"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setDropdownIsToggle(true)}
          onBlur={() => setDropdownIsToggle(false)}
          onKeyDown={handleKeyDown}
          placeholder={
            !userList ? 'Fetching data from server' : 'Search for a user'
          }
        />
        <FilterButton
          $isToggle={filterIsToggle}
          onClick={() => setFilterIsToggle(!filterIsToggle)}
        >
          <BiFilter />
        </FilterButton>
      </InputGroup>
      <Dropdown
        isOpen={results.length > 0 && dropdownIsToggle}
        toggle={() => {}}
      >
        <DropdownToggle style={{ display: 'none' }}></DropdownToggle>
        <DropdownMenuContainer>
          {results.map((result, index) => (
            <DropdownItem
              key={index}
              $isFirst={index === 0}
              $isLast={index === results.length - 1}
              $isActive={activeIndex === index}
              onClick={() => {
                setQuery(result.item.displayName);
                setUserId(result.item.localId);
                handleSubmit();
                setDropdownIsToggle(false);
              }}
            >
              {result.item.displayName}
            </DropdownItem>
          ))}
        </DropdownMenuContainer>
      </Dropdown>
    </UserSelectorContainer>
  );
};

export default UserSelector;
