import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dashboard, { dashboardProps } from "../components/Dashboard";
import axios from "axios";
import SearchBar from '../components/SearchBar';

const StyledTitle = styled.h1`
diplay: flex;
align-items: center;
  margin: 0;
`
const MainContent = styled.div`
display:flex;
align-items: center;
justify-content: space-around;
padding: 7% 0 7% 0;
`
const VideoContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
justify-items: center;
width: 40%;
overflow: hidden;
border-radius: 7%;
box-shadow: 25px 0 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45);

@media (max-width: 1000px){
    grid-template-columns: 1fr;
    width: 25%;
    border-radius: 10px;
    box-shadow: none;
    }

    @media (max-width: 600px){
        display: none;
    }
`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
font-size: 160%;
width: 40%;
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
const ButtonContainer = styled.div`
display: flex;
height: auto;
justify-content: center;
`
const DashboardContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 80%;
background-color: #57a7d1;
padding-top: 50px;
`
const Video = styled.video`
max-width: 100%;
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



const LandingPage: React.FC = () => {

    interface WeatherData {
        dt_txt: string;
        wind: { speed: number };
        main: { temp: number };
        weather: [{ icon: string }]
    }

    type dashboardDataObj = {
        wind: Number;
        maxTemp: Number;
        minTemp: Number;
        cityName: string;
        date: string;
    }

    const dashboardData: dashboardDataObj[] = []

    //states
    const [temperaturesObj, setTemperaturesObj] = useState<{ [date: string]: number[] }>({});
    const [windObj, setWindObj] = useState<{ [date: string]: number[] }>({})
    const [iconsObj, setIconsObj] = useState<{ [date: string]: string[] }>({})
    const [city, setCity] = useState<string>("Lisbon")

    useEffect(() => {

        const fetchData = async () => {
            //requesting the data of 5 days forecast
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=403a9c02b9a56c52b7c077f403577b67&units=metric`)
                console.log(response.data)
                //objects with some arrays with the valeus for each day
                const newTemperaturesObj: { [date: string]: number[] } = {};
                const newIconsObj: { [date: string]: string[] } = {};


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
                        windObj[date] = []
                    }
                    //push the values of the list to day day's array
                    newTemperaturesObj[date].push(temperature);
                    newIconsObj[date].push(icon)
                    windObj[date].push(wind)
                });

                //setting a new data's object to re-render
                setTemperaturesObj(newTemperaturesObj);
                setIconsObj(newIconsObj);
                dashboardData.length = 0
            }
            catch (error) {
                console.log(error)
            }
        };

        fetchData()
    }, [city])

    Object.keys(temperaturesObj).forEach((day) => {
        const maxTemp = Math.max(...temperaturesObj[day]);
        const minTemp = Math.min(...temperaturesObj[day]);
        const maxWind = Math.max(...windObj[day]);

        dashboardData.push({
            wind: maxWind,
            maxTemp: maxTemp,
            minTemp: minTemp,
            cityName: city,
            date: day
        })
    });


    return (
        <>
            <Header />
            <MainContent>
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
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location by logging in.</p>
                    <ButtonContainer>
                        <ButtonLog>Login</ButtonLog>
                        <ButtonLog>Register</ButtonLog>
                    </ButtonContainer>

                </InfoContainer>
            </MainContent>
            <DashboardContainer>
                <SearchBar setCity={setCity} />
                {Object.values(temperaturesObj).map((value, index) => {
                    return <Dashboard key={index} temperaturesArr={value} iconsArr={Object.values(iconsObj)[index]} dashboardData={dashboardData[index]} />
                })}
            </DashboardContainer>
            <Footer />
        </>
    );
};

export { LandingPage, StyledTitle };


