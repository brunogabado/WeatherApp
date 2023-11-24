import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import SearchBar from '../components/SearchBar';
import Modal from "../components/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, loginType, openModal, registerType } from '@/state/modal/modalSlice';
import { RootState } from '@/state/store';


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

type dashboardDataObj = {
    wind: Number;
    maxTemp: Number;
    minTemp: Number;
    date: string;
    cityName: string;
}



const StyledTitle = styled.h1`
display: flex;
align-items: center;
  margin: 0;
`
const MainContent = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
padding: 7% 0 7% 0;
background-color: #D8F2FF;
z-index: 2;
position: relative;

background: url('cloud.png') 95% 10%/cover no-repeat,
url('cloud.png') 85% 90%/cover no-repeat,
url('cloud.png') left center/cover no-repeat,
linear-gradient(rgba(216, 242, 255, 0.8), rgba(216, 242, 255, 0.8));

background-size: 20%;
`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
font-size: 160%;
width: 700px;
height: 80%;
justify-items: center;

@media (max-width: 900px){
    font-size: 140%;
}

@media (max-width: 750px){
    width: 500px;
    gap: 20px;
    font-size: 110%;
}

@media (max-width: 600px){
    gap: 20px;
    font-size: 90%;
    width: 70%;
}

`
const ButtonContainer = styled.div`
display: flex;
height: auto;
justify-content: center;
`
const ButtonLog = styled.button`
font-size: 75%;
color: black;
height: 50px;
width: 220px;
background: #57a7d1;
border-radius: 10px;
margin: 5px;

transition: 0.7s ease;

&:hover {
    border: 1px solid white;
    color: white;
    font-size: 85%;
}

@media (max-width: 1220px){
    height: 40px;
    width: 170px;
}
`
const DashboardContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
background-color: #57a7d1;
padding: 25px 0;

`
const SearchTitle = styled.h3`
margin: 0;
`

const HomePage: React.FC = () => {

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
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lon}&lon=${coordinates.lat}&appid=403a9c02b9a56c52b7c077f403577b67&units=metric`)
                console.log("requested!!")

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
        dispatch(openModal())
        dispatch(loginType())
    }

    const onClickRegister = () => {
        dispatch(closeModal())
        dispatch(registerType())
    }

    return (
        <>
            {/* <Header setOpenModal={setOpenModal} setTypeOfForm={setTypeOfForm} /> */}
            <MainContent>
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location by logging in.</p>
                    <ButtonContainer>
                        <ButtonLog onClick={onClickLogin}>Login</ButtonLog>
                        <ButtonLog onClick={onClickRegister}>Register</ButtonLog>
                    </ButtonContainer>
                </InfoContainer>
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

export default HomePage;




