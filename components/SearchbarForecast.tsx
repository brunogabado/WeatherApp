import styled from "styled-components";
import React, { useState, useRef } from "react";
import LoadingIcon from "./icons/LoadingIcon";

export const Form = styled.form`
  width: 50%;

  @media (max-width: 700px) {
    width: 80%;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;
export const SearchInputContainer = styled.div`
  display: flex;
  height: 42px;
  border-radius: 25px;
  background-color: #ececec;
`;
export const SearchInput = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 40px;
  border-radius: 25px;
  background-color: #ececec;
  border: none;
  font-size: 16px;

  &::placeholder {
    text-align: center;
  }
`;
export const List = styled.ul`
  height: 170px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 20px;
  overflow: auto;

  animation: fade-in 1s ease-in-out;

  @keyframes fade-in {
    from {
      transform: translateY(0%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;
export const Option = styled.button`
  margin: 1px 0 1px 0;
  padding: 12px;
  align-content: center;
  background-color: #ececec;
  border: none;
  font-size: 16px;
`;

export interface cityInfo {
  searchedName: string;
  localName: string;
  coordinates: number[];
}

interface searchBarProps {
  autoCompleteList: cityInfo[];
  searchCity: (city: string) => void;
  selectCity: (city: cityInfo) => void;
}

const SearchBar: React.FC<searchBarProps> = ({ autoCompleteList, searchCity, selectCity }) => {
  //useState to control the extend or not of the autoComplete dropdown div
  const [openList, setOpenList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //setting a Ref to control the calls to the searchCity function. Doing this we are controlling the request to the api.
  const timeoutRef = useRef<number | null>(null);

  const searchInputReference = document.getElementById("searchInput2") as HTMLInputElement | null;

  //function to control the flow and call the autocompleteList
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    //if a timeout exists when we call this function, we clear before create a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    //creating a new timeout
    timeoutRef.current = window.setTimeout( async() => {
      if (e.target.value.length > 1) {
        setOpenList(true);
        //function where the api is
        await searchCity(e.target.value);
        setIsLoading(false)
      } else {
        //open the autocomplete list/dropdown
        setOpenList(false);
        setIsLoading(false)
      }
    }, 800);
  };

  //function to handle the click in one of the options and call the function that get the forecast
  const handleOptionClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    selectCity(autoCompleteList[index]);
    setOpenList(!openList);
    setIsLoading(false);
    if (searchInputReference !== null) {
      searchInputReference.value = "";
    } else {
      console.error("Search input not found");
    }
  };
  return (
    <Form>
      <SearchInputContainer>
        <SearchInput id="searchInput2" placeholder="Search for a city..." onChange={(event) => handleInputChange(event)} />
        {isLoading && <LoadingIcon />}
      </SearchInputContainer>

      {openList && (
        <List>
          {autoCompleteList.map((city, index) => (
            <Option onClick={(event) => handleOptionClick(event, index)} key={index}>
              {city.localName}
            </Option>
          ))}
        </List>
      )}
    </Form>
  );
};

export default SearchBar;
