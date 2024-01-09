import styled from "styled-components";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Form, List, SearchInput, SearchInputContainer, Option } from "./SearchbarForecast";
import LoadingIcon from "./icons/LoadingIcon";

interface cityProps {
  name: string;
  longitude: number;
  latitude: number;
}

interface searchedCitiesInfo {
  text_pt: string;
  place_name: string;
  geometry: {
    coordinates: number[];
  };
}

type searchbarProps = {
  handleNewInput: (city: cityProps) => void;
};

const FormList = styled(Form)`
  width: 70%;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    width: 400px;
  }

  @media (max-width: 450px) {
    width: 300px;
  }
`;


const SearchBarProfile: React.FC<searchbarProps> = ({ handleNewInput }) => {
  //useState to control the extend or not of the autoComplete dropdown div
  const [openList, setOpenList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [autoCompleteList, setAutoCompleteList] = useState<cityProps[]>([]);

  //setting a Ref to control the calls to the searchCity function. Doing this we are controlling the request to the api.
  const timeoutRef = useRef<number | null>(null);

  //get the references of the searchbars
  const searchInputsReferences = document.querySelectorAll(".searchInput") as NodeListOf<HTMLInputElement>;

  //searchCity api:
  const searchCity = async (city: string) => {
    try {
      //Search cities by name to get a list to do an autocomplete.
      const response = await axios.get(`https://api.maptiler.com/geocoding/${city}.json?key=PTLty8xCfargkFm295Ip&language=pt`);

      //creating an array to store all the cities we received in the response.
      const NewAutoCompleteList: cityProps[] = response.data.features.map((item: searchedCitiesInfo) => ({
        name: item.place_name,
        longitude: item.geometry.coordinates[0],
        latitude: item.geometry.coordinates[1],
      }));

      //setting the list to render the autocomeplete
      setAutoCompleteList(NewAutoCompleteList);
    } catch (e) {
      console.log("error: ", e);
    }
    setIsLoading(false);
  };

  //function to control the flow and call the autocompleteList
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    //if a timeout exists when we call this function, we clear before create a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    //creating a new timeout
    timeoutRef.current = window.setTimeout(() => {
      if (e.target.value.length > 1) {
        setOpenList(true);
        //function where the api is
        searchCity(e.target.value);
      } else {
        //open the autocomplete list/dropdown
        setOpenList(false);
        setIsLoading(false);
      }
    }, 800);
  };

  //function to handle the click in one of the options and call the function that get the forecast
  const handleOptionClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    //send the option choosed to the Page
    handleNewInput(autoCompleteList[index]);
    //close the autocomplete list
    setOpenList(!openList);

    //cleaning the searchbar after the choose made
    if (searchInputsReferences.length > 0) {
      searchInputsReferences.forEach((searchInput: HTMLInputElement) => (searchInput.value = ""));
    } else {
      console.error("Search input not found");
    }
  };
  return (
    <FormList>
      <SearchInputContainer>
        <SearchInput className="searchInput" placeholder="Search for a city..." onChange={(event) => handleInputChange(event)} />
        {isLoading && <LoadingIcon />}
      </SearchInputContainer>
      {openList && (
        <List>
          {autoCompleteList.map((city, index) => (
            <Option onClick={(event) => handleOptionClick(event, index)} key={index}>
              {city.name}
            </Option>
          ))}
        </List>
      )}
    </FormList>
  );
};

export default SearchBarProfile;
