import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Dashboard, { MaxTempIcon, MinTempIcon } from "../components/Dashboard";
import axios from "axios";
import SearchBar from "../components/SearchbarForecast";
import Modal from "../components/Modal";
import cookie from "cookie";
import { GetServerSidePropsContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { loginType, openModal, registerType } from "@/state/modal/modalSlice";
import { setIsLogged } from "@/state/user/userSlice";
import { RootState } from "@/state/store";
import WindIcon from "@/components/icons/WindIcon";
import { InfoHourIcon, InfoMaxTempIcon, InfoMinTempIcon } from "./Profile";
import WeatherIcon from "@/components/icons/WeatherIcon";
import CorrectIcon from "@/components/icons/CorrectIcon";

/////interfaces

interface WeatherData {
  dt_txt: string;
  wind: { speed: number };
  main: { temp: number };
  weather: [{ icon: string }];
}

interface searchedCitiesInfo {
  text_pt: string;
  place_name: string;
  geometry: {
    coordinates: number[];
  };
}

interface cityInfo {
  searchedName: string;
  localName: string;
  coordinates: number[];
}

interface homepageProp {
  isLogged: boolean;
}

type dashboardDataObj = {
  wind: Number;
  maxTemp: Number;
  minTemp: Number;
  date: string;
  cityName: string;
};

//////styles
const StyledTitle = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 2.8rem;
  color: white;

  @media (max-width: 500px) {
    font-size: 1.7rem;
  }
`;
export const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 7% 0;
  z-index: 2;
  position: relative;
  background-color: #57a7d1;
  color: white;
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
    font-size: 1rem;
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
`;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #468bbf;
  height: 50px;
  width: 200px;
  background: #d8f2ff;
  border-radius: 8px;
  border-color: white;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    color: white;
    background: #468bbf;
  }

  @media (max-width: 500px) {
    width: 120px;
    height: 40px;
    font-size: 1rem;
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
  margin: 80px 0;
  animation: slidein 1.5s ease-in-out;

  @media (max-width: 500px) {
    flex-direction: column;
    width: 180px;
    align-items: center;
  }

  @keyframes slidein {
    from {
      transform: translateX(-200%);
    }

    to {
      transform: translateX(0%);
    }
  }
`;
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

  @media (max-width: 450px) {
    font-size: 1.1rem;
  }
`;
const ExplainInfoContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-content: space-around;
  z-index: 2;
  position: relative;
  padding: 25px;

  @media (max-width: 850px) {
    flex-direction: column;
    gap: 30px;
  }

  svg {
    min-width: 50px;
  }
`;
const LinkForecastContainer = styled.div`
  display: flex;
  text-align: center;
  color: white;
  justify-content: center;
  background-color: #57a7d1;
`;
const LinkForecast = styled.h2`
  margin: 0 0 40px 0;
  text-decoration: underline;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: white;
    transform: scale(1.2);
  }

  @media (max-width: 450px) {
    font-size: 14px;
  }
`;
const BoxImageInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 300px;
  margin: 20px 0 20px 0;
  padding: 30px;
  border-radius: 25px;
  gap: 10px;
  margin: 0;
  border: 2px solid black;

  li {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 13px;
    font-weight: 600;

    @media (max-width: 500px) {
      transform: scale(0.9);
    }
  }

  svg {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 1150px) {
    width: 300px;
  }

  @media (max-width: 500px) {
    padding: 15px;
    width: 280px;
    transform: scale(0.8);
  }
`;
const TextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;

  @media (max-width: 450px) {
  }
`;
const Feature = styled.li`
  display: flex;
  align-content: center;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 450px) {
    font-size: 15px;
  }
`;
const FeaturesTitle = styled.h2`
  text-align: center;
  @media (max-width: 450px) {
    font-size: 19px;
  }
`;
//Homepage component

const HomePage: React.FC<homepageProp> = ({ isLogged }) => {
  //redux actions
  const dispatch = useDispatch();
  //redux state
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  //states
  const [weatherData, setWeatherData] = useState({
    temperaturesObj: {} as { [date: string]: number[] },
    windObj: {} as { [date: string]: number[] },
    iconsObj: {} as { [date: string]: string[] },
    dashboardExtraData: [] as dashboardDataObj[],
  });

  const targetRef = useRef<HTMLDivElement>(null);

  //states of the dashboard
  const [autoCompleteList, setAutoCompleteList] = useState<cityInfo[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number }>({ lat: 0, lon: 0 });
  const [city, setCity] = useState<cityInfo>();

  //function to get the autocomplete options
  const searchCity = async (city: string) => {
    try {
      //Search cities by name to get a list to do an autocomplete.
      const response = await axios.get(`https://api.maptiler.com/geocoding/${city}.json?key=PTLty8xCfargkFm295Ip&language=pt`);

      //creating an array to store all the cities we received in the response.
      const NewAutoCompleteList: cityInfo[] = response.data.features.map((item: searchedCitiesInfo) => ({
        searchedName: item.text_pt,
        localName: item.place_name,
        coordinates: item.geometry.coordinates,
      }));

      //setting the list to render the aautocomeplete
      setAutoCompleteList(NewAutoCompleteList);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  useEffect(() => {
    if (isLogged) {
      dispatch(setIsLogged());
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lon}&lon=${coordinates.lat}&appid=403a9c02b9a56c52b7c077f403577b67&units=metric`,
        );

        //objects with some arrays with the valeus for each day
        const newTemperaturesObj: { [date: string]: number[] } = {};
        const newIconsObj: { [date: string]: string[] } = {};
        const newWindObj: { [date: string]: number[] } = {};
        const newDashboardData: dashboardDataObj[] = [];

        //iterate over the response, over every list(3 in 3 hours) to get every value needed by day.
        response.data.list.forEach((item: WeatherData) => {
          const date = item.dt_txt.split(" ")[0];
          const wind = item.wind.speed;
          const temperature = item.main.temp;
          const icon = item.weather[0].icon;

          //check if the day was already created, if it's not, create
          if (!newTemperaturesObj[date]) {
            newTemperaturesObj[date] = [];
            newIconsObj[date] = [];
            newWindObj[date] = [];
          }
          //push the values of the list to the day's array
          newTemperaturesObj[date].push(temperature);
          newIconsObj[date].push(icon);
          newWindObj[date].push(wind);
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
            cityName: city?.localName || "Unknown City",
          });
        });

        setWeatherData({
          temperaturesObj: newTemperaturesObj,
          windObj: newWindObj,
          iconsObj: newIconsObj,
          dashboardExtraData: newDashboardData,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [city]);

  //function to set the city choosed by the user, to get the forecast
  const selectCity = (city: cityInfo) => {
    //setting the city and coordinates, making the page re-render
    setCity(city);
    setCoordinates({
      lat: city.coordinates[0],
      lon: city.coordinates[1],
    });
  };

  const onClickLogin = () => {
    if (!isLogged) {
      dispatch(openModal());
      dispatch(loginType());
    }
  };

  const onClickRegister = () => {
    if (!isLogged) {
      dispatch(openModal());
      dispatch(registerType());
    }
  };

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
        <ImageInfo src="infoImg.png" />
      </MainContent>
      <LinkForecastContainer>
        <LinkForecast onClick={() => targetRef.current?.scrollIntoView({ behavior: "smooth" })}>
          See here the forecast for the next 5 days
        </LinkForecast>
      </LinkForecastContainer>
      <ExplainInfoContainer>
        <ImageInfo src="paperAirplane.png" />
        <TextInfoContainer>
          <FeaturesTitle>Creating an account will give you access to these features:</FeaturesTitle>
          <ListFeatures>
            <Feature>
              <CorrectIcon />
              Create a list up to 4 cities
            </Feature>
            <Feature>
              <CorrectIcon />
              Choose your city to be compared
            </Feature>
            <Feature>
              <CorrectIcon />
              Choose between 3 days
            </Feature>
            <Feature>
              <CorrectIcon />
              Get the comparison about these weather conditions:
            </Feature>
            <BoxImageInfo>
              <li>
                <InfoHourIcon />
                Local hour (at the moment)
              </li>

              <li>
                <WeatherIcon />
                Icon with the state of the weather <br></br>(of the selected day)
              </li>

              <li>
                <InfoMaxTempIcon />
                Maximum Temperature ºC <br></br>(of the selected day)
              </li>

              <li>
                <InfoMinTempIcon />
                Minimum Temperature ºC<br></br>(of the selected day)
              </li>

              <li>
                <WindIcon />
                Maximum Wind Speed km/h <br></br>(of the selected day)
              </li>
            </BoxImageInfo>
          </ListFeatures>
        </TextInfoContainer>
      </ExplainInfoContainer>
      <DashboardContainer ref={targetRef}>
        <SearchTitle>Search the forecast for 5 days at any location</SearchTitle>
        <SearchBar autoCompleteList={autoCompleteList} searchCity={searchCity} selectCity={selectCity} />

        {city && (
          <DashboardIndex>
            <IconLabelBox>
              <MaxTempIcon>ºC</MaxTempIcon>Maximum Temperature
            </IconLabelBox>
            <IconLabelBox>
              <MinTempIcon>ºC</MinTempIcon>Minimum Temperature
            </IconLabelBox>
            <IconLabelBox>
              <WindIcon />
              Maximum Wind Speed (KM/H)
            </IconLabelBox>
          </DashboardIndex>
        )}

        {city &&
          Object.values(weatherData.temperaturesObj).map((value, index) => {
            return (
              <Dashboard
                key={index}
                temperaturesArr={value}
                iconsArr={Object.values(weatherData.iconsObj)[index]}
                dashboardData={weatherData.dashboardExtraData[index]}
              />
            );
          })}
      </DashboardContainer>

      {isOpen && <Modal />}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookieToken = context.req.headers.cookie || "";
  const parsedCookie = cookie.parse(cookieToken);
  const tokenInsideCookie = parsedCookie.userToken || "";
  let isLogged = false;
  let response;

  try {
    response = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
      headers: {
        Authorization: "Bearer " + tokenInsideCookie,
      },
    });
  } catch (error: any) {
    console.error("login check:", error.message);
    response = { status: 500 };
  }

  if (!cookieToken || response.status !== 200) {
    return {
      props: { isLogged },
    };
  }
  isLogged = true;
  return {
    props: { isLogged }, // Pass the entire response as a prop
  };
}

export default HomePage;
