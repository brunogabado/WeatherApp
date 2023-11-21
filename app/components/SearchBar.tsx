import styled from "styled-components";
import React, { useState } from 'react';

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
font-size: 16px
`
const List = styled.ul`
height: 170px;
margin: 5px 0;
display: flex;
flex-direction: column;
padding: 0;
border-radius: 20px;
overflow: auto;
`
const Option = styled.button`
margin: 1px 0 1px 0;
width: 500px;
padding: 12px;
align-content: center;
background-color: #ececec;
border: none;
font-size: 16px
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setTimeout(() => {
            if (e.target.value) {
                searchCity(e.target.value)
            }
        }, 1500);
    };

    const handleOptionClick = (e: React.MouseEvent, index: number) => {
        e.preventDefault()
        selectCity(autoCompleteList[index])
        autoCompleteList.length = 0
    }

    console.log("searchBar rendering")

    return (
        <form>
            <SearchBarContainer>
                <SearchInput placeholder="Search for a city..." onChange={(event) => handleInputChange(event)} />

                {autoCompleteList.length > 0 &&
                    <List>
                        {autoCompleteList.map((city, index) => (<Option onClick={(event) => handleOptionClick(event, index)} key={index}>{city.localName}</Option>))}
                    </List>}
            </SearchBarContainer >
        </form>
    )
}

export default SearchBar