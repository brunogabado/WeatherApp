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

    const [openList, setOpenList] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setTimeout(() => {
            if (e.target.value.length > 1) {
                setOpenList(true)
                searchCity(e.target.value)
            } else {
                setOpenList(false)
            }
        }, 1200);
    };

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