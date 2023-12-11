import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Dashboard, { MaxTempIcon, MinTempIcon } from "../components/Dashboard";
import axios from "axios";
import SearchBar from '../components/SearchbarForecast';
import Modal from "../components/Modal";
import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { loginType, openModal, registerType } from '@/state/modal/modalSlice';
import { setIsLogged } from '@/state/user/userSlice';
import { RootState } from '@/state/store';


/////interfaces

interface WeatherData {
    dt_txt: string;
    wind: { speed: number };
    main: { temp: number };
    weather: [{ icon: string }]
}

interface searchedCitiesInfo {
    text_pt: string,
    place_name: string,
    geometry: {
        coordinates: number[]
    }
}

interface cityInfo {
    searchedName: string,
    localName: string,
    coordinates: number[]
}

interface homepageProp {
    isLogged: boolean
}

type dashboardDataObj = {
    wind: Number;
    maxTemp: Number;
    minTemp: Number;
    date: string;
    cityName: string;
}



//////styles
const StyledTitle = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 2.8rem;
  color: black;

  @media (max-width: 500px) {
 font-size: 1.7rem;
}
`;

export const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 7% 0;
  background-color: #d8f2ff;
  z-index: 2;
  position: relative;
  background-color: #d8f2ff;
  margin: 90px 0 0 0;
  width: 100%;

  @media (max-width: 850px) {
flex-direction: column;
gap: 30px;
  }


`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.9rem;
  max-width: 600px;
  justify-content: center;
  gap: 20px;
  text-align: center;
 

  
  @media (max-width: 1150px) {
    font-size: 1.3rem;
    max-width: 450px;
  }

  @media (max-width: 850px) {
    font-size: 1.3rem;
    max-width: 600px;
  }

  @media (max-width: 750px) {
    width: 80%;
    gap: 20px;
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
max-width: 400px;
font-size: 1.0rem;
}
`;

const ImageInfo = styled.img`
 width: 600px;

 @media (max-width: 1000px) {
width: 400px;
  }

  @media (max-width: 500px) {
width: 300px;
}
`

const ButtonContainer = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  gap: 35px;

  @media (max-width: 850px) {
gap: 25px;
  }

  @media (max-width: 500px) {
 gap: 5px;
}
`;

const ButtonLog = styled.button`
display:flex;
align-items: center;
justify-content: center;
  font-size: 1rem;
  color: black;
  height: 50px;
  width: 200px;
  background: #57a7d1;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #468bbf;
  }

  @media (max-width: 500px) {
 width: 120px;
 height: 40px;
}

`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #57a7d1;
  padding: 25px 10px;
  border-top-left-radius: 65px;
  border-top-right-radius: 65px;
`;

const DashboardIndex = styled.div`
display: flex;
gap: 15px;
background-color: white;
padding: 10px;
border-radius: 25px;
margin: 80px 0 ;

@media (max-width: 500px) {
    flex-direction: column;
    width: 180px;
    align-items: center;
  }
`

const IconLabelBox = styled.div`
display: grid;
grid-template-rows: 1fr 1.5fr;
flex-direction: column;
text-align: center;
gap: 5px;
justify-items: center;
align-content: center;
max-width: 110px;
font-size: 18px;
font-weight: 600;

@media (max-width: 850px) {
font-size: 16px;
gap: 0px;
  }


`

const SearchTitle = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  color: #fff;
  text-align: center;
  padding: 10px 20px;

  @media (max-width: 500px) {
font-size: 1.4rem;
}
`;
//Homepage component

const HomePage: React.FC<homepageProp> = ({ isLogged }) => {


    //redux actions
    const dispatch = useDispatch()
    //redux state
    const isOpen = useSelector((state: RootState) => state.modal.isOpen)

    //states
    const [weatherData, setWeatherData] = useState({
        temperaturesObj: {} as { [date: string]: number[] },
        windObj: {} as { [date: string]: number[] },
        iconsObj: {} as { [date: string]: string[] },
        dashboardExtraData: [] as dashboardDataObj[]
    });

    //states of the dashboard
    const [autoCompleteList, setAutoCompleteList] = useState<cityInfo[]>([])
    const [coordinates, setCoordinates] = useState<{ lat: number, lon: number }>({ lat: 0, lon: 0 });
    const [city, setCity] = useState<cityInfo>()

    //function to get the autocomplete options
    const searchCity = async (city: string) => {
        try {
            //Search cities by name to get a list to do an autocomplete.
            const response = await axios.get(`https://api.maptiler.com/geocoding/${city}.json?key=PTLty8xCfargkFm295Ip&language=pt`)

            //creating an array to store all the cities we received in the response.
            const NewAutoCompleteList: cityInfo[] = response.data.features.map((item: searchedCitiesInfo) => ({
                searchedName: item.text_pt,
                localName: item.place_name,
                coordinates: item.geometry.coordinates,
            }));

            //setting the list to render the aautocomeplete
            setAutoCompleteList(NewAutoCompleteList)

        }
        catch (e) {
            console.log("error: ", e)
        }

    }

    useEffect(() => {

        if (isLogged) {
            dispatch(setIsLogged())
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lon}&lon=${coordinates.lat}&appid=403a9c02b9a56c52b7c077f403577b67&units=metric`)

                //objects with some arrays with the valeus for each day
                const newTemperaturesObj: { [date: string]: number[] } = {};
                const newIconsObj: { [date: string]: string[] } = {};
                const newWindObj: { [date: string]: number[] } = {};
                const newDashboardData: dashboardDataObj[] = []

                //iterate over the response, over every list(3 in 3 hours) to get every value needed by day.
                response.data.list.forEach((item: WeatherData) => {
                    const date = item.dt_txt.split(' ')[0];
                    const wind = item.wind.speed
                    const temperature = item.main.temp;
                    const icon = item.weather[0].icon

                    //check if the day was already created, if it's not, create
                    if (!newTemperaturesObj[date]) {
                        newTemperaturesObj[date] = [];
                        newIconsObj[date] = []
                        newWindObj[date] = []
                    }
                    //push the values of the list to the day's array
                    newTemperaturesObj[date].push(temperature);
                    newIconsObj[date].push(icon)
                    newWindObj[date].push(wind)
                });

                //setting a new data's object to re-render

                Object.keys(newTemperaturesObj).forEach((day) => {
                    const maxTemp = Math.max(...newTemperaturesObj[day]);
                    const minTemp = Math.min(...newTemperaturesObj[day]);
                    const maxWind = Math.max(...newWindObj[day]);
                    newDashboardData.push({
                        wind: maxWind,
                        maxTemp: maxTemp,
                        minTemp: minTemp,
                        date: day,
                        cityName: city?.localName || 'Unknown City',
                    });
                });

                setWeatherData({
                    temperaturesObj: newTemperaturesObj,
                    windObj: newWindObj,
                    iconsObj: newIconsObj,
                    dashboardExtraData: newDashboardData
                })

            }
            catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, [city]);

    //function to set the city choosed by the user, to get the forecast
    const selectCity = (city: cityInfo) => {
        //setting the city and coordinates, making the page re-render
        setCity(city);
        setCoordinates({
            lat: city.coordinates[0],
            lon: city.coordinates[1]
        })
    }

    const onClickLogin = () => {
        if (!isLogged) {
            dispatch(openModal())
            dispatch(loginType())
        }
    }

    const onClickRegister = () => {
        if (!isLogged) {
            dispatch(openModal())
            dispatch(registerType())
        }
    }

    return (
        <>
            <MainContent>
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location or any other city by logging in.</p>
                    <ButtonContainer>
                        <ButtonLog onClick={onClickLogin}>Login</ButtonLog>
                        <ButtonLog onClick={onClickRegister}>Register</ButtonLog>
                    </ButtonContainer>
                </InfoContainer>
                <ImageInfo src='infoImg.png' />
            </MainContent>
            <DashboardContainer>
                <SearchTitle>Search the forecast for 5 days at any location</SearchTitle>
                <SearchBar autoCompleteList={autoCompleteList} searchCity={searchCity} selectCity={selectCity} />

                {city &&
                    <DashboardIndex >
                        <IconLabelBox><MaxTempIcon>Cº</MaxTempIcon>Maximum Temperature</IconLabelBox>
                        <IconLabelBox><MinTempIcon>Cº</MinTempIcon>Minimum Temperature</IconLabelBox>
                        <IconLabelBox>
                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z" fill="#1C274C" />
                                <path opacity="0.4" d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C" />
                                <path opacity="0.7" d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z" fill="#1C274C" />
                            </svg>Maximum Wind Speed (KM/H)</IconLabelBox>
                    </DashboardIndex>}

                {city && Object.values(weatherData.temperaturesObj).map((value, index) => {
                    return <Dashboard key={index} temperaturesArr={value} iconsArr={Object.values(weatherData.iconsObj)[index]} dashboardData={weatherData.dashboardExtraData[index]} />
                })}

            </DashboardContainer>

            {isOpen && (
                <Modal />
            )}
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookieToken = context.req.headers.cookie || "";
    const parsedCookie = cookie.parse(cookieToken);
    const tokenInsideCookie = parsedCookie.userToken || "";
    let isLogged = false
    let response;

    try {
        response = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
            headers: {
                Authorization: "Bearer " + tokenInsideCookie
            }
        });
    } catch (error: any) {
        console.error("login check:", error.message);
        response = { status: 500 };
    }

    if (!cookieToken || response.status !== 200) {
        return {
            props: { isLogged }
        };
    }
    isLogged = true
    return {
        props: { isLogged }, // Pass the entire response as a prop
    };
}


export default HomePage;




