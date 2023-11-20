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

export interface searchBarProps {
    autoCompleteList: {
        searchedName: string,
        localName: string,
        coordinates: []
    }[],
    searchCity: (city: string) => void,


}

const SearchBar: React.FC<searchBarProps> = ({ autoCompleteList, searchCity }) => {
    console.log(autoCompleteList)
    console.log(searchCity)

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            console.log("o codigo rodou")
            // console.log('Delayed code executed after 1000 milliseconds');
        }, 700);
    };

    return (
        <form>
            <SearchBarContainer>
                <SearchInput placeholder="Search for a city..." onChange={(event) => handleClick(event)} />
                <List>
                    {/* <Option value={index} onClick={handleClick}>Lisbon</Option> */}
                    <Option>Lamarosa</Option>
                    <Option>Lisbon</Option>
                    <Option>Lamarosa</Option>
                    <Option>Lisbon</Option>
                    <Option>Lamarosa</Option>
                </List>
            </SearchBarContainer >
        </form>
    )
}

export default SearchBar