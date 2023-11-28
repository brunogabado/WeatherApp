import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSidePropsContext } from 'next';
import styled from "styled-components";
import axios from "axios";
import cookie from 'cookie'
import { setIsLogged } from '@/state/user/userSlice';

const StyledTitle = styled.h1`
  margin-top: 90px;
`;

const InputsListContainer = styled.div`
margin-top: 90px;
align-self: center;
    width: 80%;
    height: 500px;
    background-color: #57a7d1;
border: 3px solid white;
border-radius: 25px;

`

const ListContainer = styled.div`

`

const InputsContainer = styled.div`

`


interface city {
    name: string
    longitude: number
    latitude: number
}

interface ProfileProps {
    userData: {
        name: string,
        email: string,
        userCity: city,
        userList: {
            cities_id: number,
            city_data: city
        }[]
    }
}

const ProfilePage: React.FC<ProfileProps> = ({ userData }) => {
    const dispatch = useDispatch()
    dispatch(setIsLogged())
    return (
        <>
            <InputsListContainer>
                <ListContainer>
                    <div>Portugal                    X</div>
                    <div>Portugal                    X</div>
                    <div>Portugal                    X</div>
                    <div>Portugal                    X</div>
                    <div>Portugal                    X</div>
                    <div>Portugal                    X</div>

                </ListContainer>
                <InputsContainer></InputsContainer>
            </InputsListContainer>

            <StyledTitle>welcome, {userData.name}</StyledTitle>
            <p>MyCity: {userData.userCity.name}</p>
            <div>my cities inside the list: {userData.userList.map((city, index) => <p key={index}>{city.city_data.name}</p>)}</div>
        </>
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
        userCity: response.data.user_city,
        userList: response.data.list
    }

    return {
        props: { userData }, // Pass the entire response as a prop
    };
}

export default ProfilePage;