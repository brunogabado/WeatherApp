import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import SearchBar from '../components/SearchbarForecast';
import Modal from "../components/Modal";
import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { loginType, openModal, registerType } from '@/state/modal/modalSlice';
import { RootState } from '@/state/store';
import { setIsLogged } from '@/state/user/userSlice';


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
    logged: boolean
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
  gap: 15px;

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
  height: 40px;
  width: 150px;
  background: #57a7d1;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #468bbf;
  }

  @media (max-width: 500px) {
 width: 120px;
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

const HomePage: React.FC<homepageProp> = ({ logged }) => {


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

        if (logged) {
            dispatch(setIsLogged())
        } else {
            dispatch(openModal())
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lon}&lon=${coordinates.lat}&appid=403a9c02b9a56c52b7c077f403577b67&units=metric`)
                console.log(response.data)

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
        if (!logged) {
            dispatch(openModal())
            dispatch(loginType())
        }
    }

    const onClickRegister = () => {
        if (!logged) {
            dispatch(openModal())
            dispatch(registerType())
        }
    }

    return (
        <>
            <MainContent>
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location by logging in.</p>
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
    let logged = false
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
            props: { logged }
        };
    }
    logged = true
    console.log(logged)
    return {
        props: { logged }, // Pass the entire response as a prop
    };
}


export default HomePage;




