import React from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { FetchResult } from "@apollo/client";

import InputField from "components/InputField";

const Container = styled.div`
  position: relative;
`;

const DataList = styled.div`
  position: absolute;
  z-index: 3;
  background-color: #fafafa;
  width: 100%;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 0px 2px #eadada;
  & > * {
    cursor: pointer;
    padding: 0.5rem;
    transition: background-color 0.2s;
    &: hover {
      background-color: lightgreen;
    }
  }
`;

interface Props<T> {
  value: string;
  label: string;
  fetchResult: FetchResult<T[]>;
  searchTermChanged: (term: string) => void;
  optionRenderer: (item: T) => string;
  optionSelected: (item: T) => void;
}

export default function Combobox<T>({
  fetchResult,
  label,
  value,
  searchTermChanged,
  optionRenderer,
  optionSelected,
}: Props<T>) {
  const { data } = fetchResult;
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<T[]>([]);

  React.useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  const debouncedQuery = debounce((value: string) => {
    searchTermChanged(value);
  }, 300);

  const onChange = React.useCallback(
    (inputVal: string) => {
      debouncedQuery(inputVal);
    },
    [setInputValue]
  );

  const suggestionSelected = React.useCallback(
    (e: any, item: T) => {
      e.preventDefault();
      optionSelected(item);
      setSuggestions([]);
      setInputValue(optionRenderer(item));
    },
    [setSuggestions]
  );

  return (
    <Container>
      <InputField
        label={label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const inputVal = e.target.value;
          setInputValue(inputVal);
          onChange(inputVal);
        }}
        inputProps={{
          value: inputValue || value || "",
        }}
      />
      {suggestions.length > 0 && (
        <DataList id="suggestions" role="listbox">
          {suggestions.map((item: T) => {
            const optionName = optionRenderer(item);
            return (
              <option
                key={JSON.stringify(item)}
                onClick={(e) => suggestionSelected(e, item)}
              >
                {optionName}
              </option>
            );
          })}
        </DataList>
      )}
    </Container>
  );
}
