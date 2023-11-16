import styled from "styled-components";
import React, { useState } from 'react';
import { set } from "mongoose";

const SearchBarContainer = styled.div`
display: flex;
height: 50px;
justify-content: center;
border-radius: 25px;
overflow: hidden;
border: 1px solid black;
background-color: white;
margin: 25px;
`
const SearchInput = styled.input`
width: 500px;
border-radius: 25px;
background-color: #ececec;
border: none;
padding: 20px;
font-size: 18px
`

const SearchButton = styled.button`
background-color: white;
border: none;
transition: 0.7s ease;
margin: 5px;

`

export interface searchBarProps {
    setCity: (city: string) => void
}

const SearchBar: React.FC<searchBarProps> = ({ setCity }) => {

    const [cityInput, setCityInput] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCity(cityInput)
    }

    return (
        <form onSubmit={handleSubmit}>
            <SearchBarContainer>
                <SearchInput placeholder="Search for a city..." value={cityInput} onChange={(event) => setCityInput(event.target.value)} />
                <SearchButton><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </SearchButton>
            </SearchBarContainer >
        </form>
    )
}

export default SearchBar