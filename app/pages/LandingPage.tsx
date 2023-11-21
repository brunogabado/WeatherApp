import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import SearchBar from '../components/SearchBar';

const StyledTitle = styled.h1`
diplay: flex;
align-items: center;
  margin: 0;
`
const MainContent = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
padding: 7% 0 7% 0;
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

@media (max-width: 700px){
    gap: 20px;
    font-size: 110%;
}

@media (max-width: 600px){
    gap: 20px;
    font-size: 90%;
    width: 70%;
}
`
const VideoContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
width: 700px;
margin-top: 50px
`
const ButtonContainer = styled.div`
display: flex;
height: auto;
justify-content: center;
`

const Video = styled.video`
border-radius: 50%;
flex-wrap: wrap;
max-width: 150px;
object-fit: contain;
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
`

const LandingPage: React.FC = () => {

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

    //states
    const [weatherData, setWeatherData] = useState({
        temperaturesObj: {} as { [date: string]: number[] },
        windObj: {} as { [date: string]: number[] },
        iconsObj: {} as { [date: string]: string[] },
        dashboardExtraData: [] as dashboardDataObj[]
    });

    const [autoCompleteList, setAutoCompleteList] = useState<cityInfo[]>([])
    const [coordinates, setCoordinates] = useState<{ lat: number, lon: number }>({ lat: 0, lon: 0 });
    const [city, setCity] = useState<cityInfo>()

    const searchCity = async (city: string) => {
        try {
            //Search cities by name to get a list to do an autocomplete.
            const response = await axios.get(`https://api.maptiler.com/geocoding/${city}.json?key=PTLty8xCfargkFm295Ip&language=pt`)
            console.log(response)
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
            //requesting the data of 5 days forecast 
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

    const selectCity = (city: cityInfo) => {
        setCity(city);
        setCoordinates({
            lat: city.coordinates[0],
            lon: city.coordinates[1]
        })
    }

    // console.log("weatherData: ", weatherData)
    // console.log("autoCompleteList: ", autoCompleteList)
    // console.log("city:  ", city)
    // console.log("Landing page rendering................................................")

    return (
        <>
            <Header />
            <MainContent>
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location by logging in.</p>
                    <ButtonContainer>
                        <ButtonLog>Login</ButtonLog>
                        <ButtonLog>Register</ButtonLog>
                    </ButtonContainer>

                </InfoContainer>
                <VideoContainer>
                    <Video loop autoPlay muted>
                        <source src="\sun.mp4" type="video/mp4" />
                    </Video>
                    <Video loop autoPlay muted>
                        <source src="\rain.mp4" type="video/mp4" />
                    </Video>
                    <Video loop autoPlay muted>
                        <source src="\arcoiris.mp4" type="video/mp4" />
                    </Video>
                    <Video loop autoPlay muted>
                        <source src="\trovao.mp4" type="video/mp4" />
                    </Video>
                </VideoContainer>
            </MainContent>
            <DashboardContainer>
                
                <SearchBar autoCompleteList={autoCompleteList} searchCity={searchCity} selectCity={selectCity} />

                {city && Object.values(weatherData.temperaturesObj).map((value, index) => {
                    return <Dashboard key={index} temperaturesArr={value} iconsArr={Object.values(weatherData.iconsObj)[index]} dashboardData={weatherData.dashboardExtraData[index]} />
                })}

            </DashboardContainer>
            <Footer />
        </>
    );
};

export { LandingPage, StyledTitle };


