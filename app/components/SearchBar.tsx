import styled from "styled-components";
import React, { useState, useRef } from 'react';

const SearchBarContainer = styled.div`
padding: 30px;
`
const SearchInput = styled.input`
padding: 12px;
align-content: center;
width: 500px;
border-radius: 25px;
background-color: #ececec;
border: none;
font-size: 16px;

@media (max-width: 700px) {
    width: 300px;
}
`
const List = styled.ul`
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
`
const Option = styled.button`
margin: 1px 0 1px 0;
width: 500px;
padding: 12px;
align-content: center;
background-color: #ececec;
border: none;
font-size: 16px;

@media (max-width: 700px) {
    width: 300px;
}
`

type cityInfo = {
    searchedName: string,
    localName: string,
    coordinates: number[]
};

interface searchBarProps {
    autoCompleteList: cityInfo[],
    searchCity: (city: string) => void,
    selectCity: (city: cityInfo) => void
}

const SearchBar: React.FC<searchBarProps> = ({ autoCompleteList, searchCity, selectCity }) => {
//useState to control the extend or not of the autoComplete dropdown div
    const [openList, setOpenList] = useState<boolean>(false)

    //setting a Ref to control the calls to the searchCity function. Doing this we are controlling the request to the api.
    const timeoutRef = useRef<number | null>(null);

    //function to control the flow and call the autocompleteList
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        //if a timeout exists when we call this function, we clear before create a new one
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        //creating a new timeout
        timeoutRef.current = window.setTimeout(() => {

            if (e.target.value.length > 1) {
                setOpenList(true)
                //function where the api is
                searchCity(e.target.value)
            } else {
                //open the autocomplete list/dropdown
                setOpenList(false)
            }
        }, 1200);
    };

    //function to handle the click in one of the options and call the function that get the forecast
    const handleOptionClick = (e: React.MouseEvent, index: number) => {
        console.log(e)
        e.preventDefault()
        selectCity(autoCompleteList[index])
        setOpenList(!openList)
    }
    return (
        <form>
            <SearchBarContainer>
                <SearchInput placeholder="Search for a city..." onChange={(event) => handleInputChange(event)} />
                {openList &&
                    <List>
                        {autoCompleteList.map((city, index) => (<Option onClick={(event) => handleOptionClick(event, index)} key={index}>{city.localName}</Option>))}
                    </List>}
            </SearchBarContainer >
        </form>
    )
}

export default SearchBar