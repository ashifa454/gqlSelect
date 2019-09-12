import React, { useState, useEffect } from "react";
import { invertedTheme, theme } from "../Theme";
import { ThemeProvider } from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
/**
 * @description styled select componnet
 */
const Select = styled.select`
  position: relative;
  display: flex;
  height: 36px;
  width: 180px;
  font-size: 16px;
  padding: 12px;
  background: ${props => props.theme.background};
  line-height: 3;
  border-radius: 4px;
  color: ${props => props.theme.foreground};
`;
const SelectTrigger = styled.div`
  cursor: ${props => (props.disabled ? `cursor` : `pointer`)};
  background: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  max-width: 150px;
  padding: 10px;
  border-radius: 4px 4px 0px 0px;
`;
const SearchableSelectTrigger = styled.input`
  cursor: pointer;
  background: ${props => props.theme.background};
  color: ${props => props.theme.foreground};
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 4px 4px 0px 0px;
`;
const SelectOptions = styled.ul`
  margin: 0;
  padding: 10px;
  list-style: none;
  max-width: 150px;
  max-height: 100px;
  overflow-y: scroll;
  background: #e2e8f0;
  border-radius: 0px 0px 4px 4px;
`;
const SelectListItem = styled.li`
  cursor: pointer;
  padding: 5px 4px;
  border-radius: 4px;
  &:hover {
    background-color: #cbd5e0;
  }
`;
function LocoNavSelect(props) {
  const {
    isInverted,
    isSearchable,
    customEndPoint,
    defaultOption,
    disabled,
    ...rest
  } = props;
  const [options, setOptions] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [query, setQuery] = useState("");
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const client = new ApolloClient({
    uri: customEndPoint.uri
  });
  const handleInputClick = () => {
    setOptionsVisible(!isOptionsVisible);
  };
  const handleOptionSelect = e => {
    props.onSelect(e.target.innerHTML);
  };
  const handleOnChange = e => {
    setQuery(e.target.value);
    const result = options.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setQueryResult(result);
  };
  useEffect(() => {
    client
      .query({
        query: gql`
          ${customEndPoint.query}
        `
      })
      .then(({ data }) => setOptions(data.countries));
  }, []);
  let dropdownOptions = [];
  if (queryResult.length > 0 || props.options.length > 0) {
    dropdownOptions = [...queryResult, props.options];
  } else {
    dropdownOptions = [...options];
  }
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isInverted ? invertedTheme : theme}>
        <div className="select-container">
          {isSearchable ? (
            <SearchableSelectTrigger
              type="text"
              value={query}
              placeholder={defaultOption}
              onChange={!disabled ? handleOnChange : null}
              onClick={!disabled ? handleInputClick : null}
            />
          ) : (
            <SelectTrigger
              disabled={disabled}
              onClick={!disabled ? handleInputClick : null}
            >
              {defaultOption}
            </SelectTrigger>
          )}
          {isOptionsVisible ? (
            <SelectOptions>
              {dropdownOptions.map(item => (
                <SelectListItem onClick={handleOptionSelect} key={item.code}>
                  {item.name}
                </SelectListItem>
              ))}
            </SelectOptions>
          ) : null}
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}
LocoNavSelect.defaultProps = {
  isInverted: false,
  isSearchable: false,
  options: [],
  customEndPoint: {
    uri: `https://countries.trevorblades.com/`,
    query: `{
      countries {
        code
        name
      }
    }`
  },
  onSelect: value => {
    console.log(value);
  }
};
export default LocoNavSelect;
