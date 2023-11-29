import { GetServerSidePropsContext } from 'next';
import styled from "styled-components";
import axios from "axios";
import cookie from 'cookie'
import { useState } from 'react';
import SearchBarProfile from '@/components/SearchbarProfile';

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
margin-top: 90px;
align-self: center;
width: 80%;
height: 500px;
background-color: #57a7d1;
border: 3px solid white;
border-radius: 25px;

`

const ListContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 50%;
border: 1px solid black;
border-radius: 25px;
border: 1px solid black;
`

const InputsContainer = styled.div`
border: 1px solid black;
width: 50%;
`

const DashBoardProfileSection = styled.div`
    
`
const DashboardProfile = styled.div`
    
`

interface cityProps {
    name: string
    longitude: number
    latitude: number
}

interface ProfileProps {
    userData: {
        name: string,
        email: string,
        userCity: cityProps,
        userList: {
            cities_id: number,
            city_data: cityProps
        }[]
    }
}



const ProfilePage: React.FC<ProfileProps> = ({ userData }) => {

    const [countriesList, setCountriesList] = useState<cityProps[]>([])
    const [userCity, setUserCity] = useState<cityProps>();
    const [dayOfSearch, setDayOfSearch] = useState<Date>()


    // const dispatch = useDispatch()
    // dispatch(setIsLogged())

    const handleNewDate = () => {
    }

    const handleAddingNewCity = (city: cityProps) => {
        setCountriesList([...countriesList, city])
    }

    const handleSetNewUserCity = (city: cityProps) => {
        setUserCity(city)
    }


    return (
        <ProfilePageContainer>
            <StyledTitle>welcome, {userData.name}</StyledTitle>
            <InputsListContainer>
                <ListContainer>
                    <SearchBarProfile handleNewInput={handleAddingNewCity} />
                    {countriesList.map((country, index) => <div><p key={index}>{country.name}</p></div>)}
                </ListContainer>
                <InputsContainer>
                    <h3>My current city is {userCity?.name}</h3>
                    <SearchBarProfile handleNewInput={handleSetNewUserCity} />
                </InputsContainer>
            </InputsListContainer>
            <DashBoardProfileSection>
                <DashboardProfile></DashboardProfile>
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
        name: response.data.name,
        email: response.data.email,
        userCity: response.data.userCity,
        userList: response.data.list
    }

    return {
        props: { userData }, // Pass the entire response as a prop
    };
}

export default ProfilePage;