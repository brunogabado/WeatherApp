import { GetServerSidePropsContext } from 'next';
import styled from "styled-components";
import axios from "axios";
import cookie from 'cookie'
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import SearchBarProfile from '@/components/SearchbarProfile';
import DashboardProfile from '@/components/DashboardProfile';

const ProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledTitle = styled.h1`
  margin: 90px 0 0 0;
`;

const InputsListContainer = styled.div`
display: flex;
margin: 50px 0;
align-self: center;
width: 80%;
padding: 30px;
background-color: #57a7d1;
border: 3px solid white;
border-radius: 25px;

`

const ListContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
width: 50%;
border-radius: 25px;
`

const CityListBox = styled.div`
    display: flex;
    border: 1px solid white;
    border-radius: 20px;
    width: 70%;
    padding: 5px;
    justify-content: space-between;
    align-items:center; 
    margin-bottom: 10px;
`

const CityListText = styled.p`
margin: 0;
font-size: 20px;
font-weight: 600;
color: white;
`

const CityListButton = styled.button`
    display: flex;
    background-color: transparent;
    border: none;
   

    &:hover{
        & svg{
            transform: scale(1.2);
            transition: transform 0.3s ease;
        }
    }

`

const InputsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 50%;
align-items: center;
text-align: center;
`

const DateButtonsContainer = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   flex-wrap: wrap;
   gap: 20px;
   justify-content: center;
`

const DateButton = styled.button`
    background-color: #57a7d1;
    border:1px solid white;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    width: 100px;
    padding: 5px;
    transition: 0.3s ease;
    position: relative;
    overflow: hidden;

    &:active{
        transition: 0.1s ease;
        border: 1px solid black;
    }

    &:hover{
    transform: scale(1.2);
    transition: transform 0.3s ease;
    }
`

const DashBoardProfileSection = styled.div`
display: flex;
justify-content: center;
width: 100%;
`

interface CityProps {
    name: string
    longitude: number
    latitude: number
}

interface ProfileProps {
    userData: {
        id: number,
        name: string,
        email: string,
        userCity: CityProps,
        userList: CityProps[],
        listID: number
    }
}


const ProfilePage: React.FC<ProfileProps> = ({ userData }) => {

    //states
    const [citiesList, setCitiesList] = useState<CityProps[] | []>(userData.userList)
    const [userCity, setUserCity] = useState<CityProps>(userData.userCity);
    const [dayOfSearch, setDayOfSearch] = useState<string>('Today')
    const [datesOfSearch, setDatesOfSearch] = useState<Date[]>([])

    console.log("userData: ", userData)
    console.log("list: ", userData.userList)
    const userCookie = getCookie('userToken')


    useEffect(() => {
        const getDaysOfSearch = () => {
            const today = new Date()
            // console.log("today", today)
            const dates: Date[] = []

            for (var i = 0; i < 6; i++) {
                var currentDate = new Date();
                currentDate.setDate(today.getDate() + i);
                // console.log(currentDate)
                dates.push(currentDate)
            }
            setDatesOfSearch(dates)
        }
        getDaysOfSearch()
    }, [])

    const handleNewDate = (event: React.MouseEvent<HTMLElement>) => {
        setDayOfSearch((event.target as HTMLButtonElement)?.value)
    }

    const handleAddingNewCity = async (city: CityProps) => {
        if (citiesList.length > 3 || citiesList.some(cityList => cityList.name === city.name)) {
            return
        }

        try {
            console.log("citiesList: ", [...citiesList, city])
            const response = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/lists/${userData.listID}`,
                {
                    list_id: userData.listID,
                    cities: [...citiesList, city]
                },

                { headers: { Authorization: "Bearer " + userCookie } })

            setCitiesList([...citiesList, city])
            console.log("response from xano: ", response)

        } catch (e) {
            console.log(e)
        }

    }

    const handleDeleteCity = async (index: number) => {
        console.log(index)
        const newList = [...citiesList.slice(0, index), ...citiesList.slice(index + 1)]

        try {
            const response = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/lists/${userData.listID}`,
                {
                    list_id: userData.listID,
                    cities: newList
                },

                { headers: { Authorization: "Bearer " + userCookie } })

            setCitiesList(newList)
            console.log(response)

        } catch (e) {
            console.log(e)
        }


    }

    const handleSetNewUserCity = async (city: CityProps) => {


        const newCity = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/user/${userData.id}`,
            { userCity: city },
            {
                headers: {
                    Authorization: "Bearer " + userCookie
                }
            })

        setUserCity(newCity.data.userCity)
    }

    return (
        <ProfilePageContainer>
            <StyledTitle>welcome, {userData.name}</StyledTitle>
            <InputsListContainer>
                <ListContainer>
                    <h3>My List of cities</h3>
                    <SearchBarProfile handleNewInput={handleAddingNewCity} />

                    {citiesList.map((country, index) =>
                        <CityListBox key={index}><CityListText key={index}>{country.name}</CityListText>
                            <CityListButton key={index} value={index} onClick={() => handleDeleteCity(index)}><svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M779.5 1002.7h-535c-64.3 0-116.5-52.3-116.5-116.5V170.7h768v715.5c0 64.2-52.3 116.5-116.5 116.5zM213.3 256v630.1c0 17.2 14 31.2 31.2 31.2h534.9c17.2 0 31.2-14 31.2-31.2V256H213.3z" fill="#3688FF" /><path d="M917.3 256H106.7C83.1 256 64 236.9 64 213.3s19.1-42.7 42.7-42.7h810.7c23.6 0 42.7 19.1 42.7 42.7S940.9 256 917.3 256zM618.7 128H405.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h213.3c23.6 0 42.7 19.1 42.7 42.7S642.2 128 618.7 128zM405.3 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7S448 403 448 426.6v256c0 23.6-19.1 42.7-42.7 42.7zM618.7 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v256c-0.1 23.6-19.2 42.7-42.7 42.7z" fill="#5F6379" /></svg></CityListButton>
                        </CityListBox>)}

                </ListContainer>
                <InputsContainer>
                    <h3>My current city is {userCity.name}</h3>
                    <SearchBarProfile handleNewInput={handleSetNewUserCity} />
                    <h3>Date picked: {dayOfSearch?.split(" ").slice(0, 4).join(" ")} </h3>
                    <DateButtonsContainer>
                        {datesOfSearch.map((day, index) => {
                            const dayInString = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : day instanceof Date ? day.toString().split(' ')[0] + ' ' + day.toString().split(' ')[2] : '';
                            return (<DateButton key={index} value={dayInString} onClick={(e) => handleNewDate(e)} >{dayInString} </DateButton>);
                        })}
                    </DateButtonsContainer>
                </InputsContainer>
            </InputsListContainer>
            <h2>{`Temperature of ${userCity.name} in comparison with every city in the list`}</h2>
            <DashBoardProfileSection>
                <DashboardProfile />
            </DashBoardProfileSection>
        </ProfilePageContainer>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookieToken = context.req.headers.cookie || "";
    const parsedCookie = cookie.parse(cookieToken);
    const tokenInsideCookie = parsedCookie.userToken || "";
    let response;

    try {
        response = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
            headers: {
                Authorization: "Bearer " + tokenInsideCookie
            }
        });
    } catch (error: any) {
        console.error("Error fetching authentication:", error.message);
        response = { status: 500 };
    }

    if (!cookieToken || response.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }

    const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        userCity: response.data.userCity,
        userList: response.data.list.cities,
        listID: response.data.list_id
    }

    return {
        props: { userData }, // Pass the entire response as a prop
    };
}

export default ProfilePage;