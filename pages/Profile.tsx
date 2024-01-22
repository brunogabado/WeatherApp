import * as React from "react";
import { GetServerSidePropsContext } from "next";
import styled from "styled-components";
import axios, { Axios } from "axios";
import cookie from "cookie";
import { getCookie } from "cookies-next";
import { useState, useEffect, useRef } from "react";
import SearchBarProfile from "@/components/SearchbarProfile";
import DashboardProfile from "@/components/DashboardProfile";
import { setIsLogged } from "@/state/user/userSlice";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material/";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InfoIcon from "@/components/icons/InfoIcon";
import CloseIcon from "@/components/icons/CloseFormIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import WeatherIcon from "@/components/icons/WeatherIcon";
import WindIcon from "@/components/icons/WindIcon";
import DashBoardUserCity from "@/components/DashboardUserCityProfile";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InputsListContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 90px;
  width: calc(100% - 60px);
  min-height: 400px;
  padding: 30px;
  background-color: #57a7d1;
  border-bottom-left-radius: 65px;
  border-bottom-right-radius: 65px;
  margin-bottom: 25px;
  @media (max-width: 900px) {
    width: calc(100% - 60px);
    flex-direction: column;
    padding-bottom: 60px;
  }

  @media (max-width: 500px) {
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
  }
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50%;
  border-radius: 25px;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;
const CityListBox = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius: 20px;
  width: 70%;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 900px) {
    width: 90%;
  }
`;
const CityListText = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: white;
`;
const CityListButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;

  &:hover {
    & svg {
      transform: scale(1.2);
      transition: transform 0.3s ease;
    }
  }
`;
const InfoDashBoardButton = styled.button`
  display: flex;
  align-self: flex-end;
  justify-self: center;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  left: 95%;
  top: 95%;

  &:hover {
    & svg {
      transform: scale(1.2);
      transition: transform 0.3s ease;
    }
  }
`;
const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  text-align: center;

  @media (max-width: 900px) {
    width: 100%;
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid white;
  }

  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;
const DateButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  @media (max-width: 900px) {
    margin-top: 20px;
  }
`;
const DateButton = styled.button<{ $dayPicked?: boolean }>`
  background-color: #57a7d1;
  border: ${(props) => (props.$dayPicked ? "3px solid white" : "1px solid black")};
  color: ${(props) => (props.$dayPicked ? "white" : "black")};
  border-radius: 10px;
  font-size: ${(props) => (props.$dayPicked ? "24px" : "22px")};
  height: 60px;
  width: 200px;
  padding: 5px;
  transition: 0.3s ease;
  position: relative;
  overflow: hidden;
  transform: ${(props) => (props.$dayPicked ? "scale(1.2)" : "scale(1.0)")};
  &:active {
    transition: 0.1s ease;
    border: 1px solid black;
  }

  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease;
  }

  @media (max-width: 1500px) {
    width: 150px;
  }

  @media (max-width: 500px) {
    width: 200px;
  }
`;
const DashBoardProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 50px;
  width: calc(100% - 100px);
  background-color: #57a7d1;
  border-top-left-radius: 65px;
  border-top-right-radius: 65px;

  h2 {
    width: 100%;
    padding: 10px;
    text-align: center;
    margin-top: 0;
    border-bottom: 2px solid white;
  }

  @media (max-width: 500px) {
    width: calc(100% - 40px);
    padding: 20px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
  }
`;
const GridOfDashboards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: white;
  width: 100%;
  justify-content: space-around;
  /* margin: 50px 0; */

  @media (max-width: 500px) {
    padding: 20px;
    gap: 0px;
  }
`;
const BoxInfo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 300px;
  margin: 20px 0 20px 0;
  padding: 30px;
  border-radius: 25px;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 13px;
    font-weight: 600;

    @media (max-width: 500px) {
      /* transform: scale(0.9); */
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
    width: 280px;
  }

  @media (max-width: 400px) {
    width: 250px;
  }
`;
export const InfoHourIcon = styled.div`
  display: flex;
  width: 45px;
  height: 30px;
  color: black;
  border: 3px solid black;
  border-radius: 20px;
`;
export const InfoMaxTempIcon = styled.div`
  display: flex;
  background-color: #ff9b50;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
export const InfoMinTempIcon = styled(InfoMaxTempIcon)`
  background-color: #a6f6ff;
`;
const InfoModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(41, 39, 39, 0.95);
  z-index: 7;

  animation: fade 0s ease-in-out;

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;
const CloseInfoButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  align-self: end;
  margin: 10px;
  width: 30px;
  height: 30px;

  transition: 0.2s ease;
  &:hover {
    transform: scale(1.3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

interface CityProps {
  name: string;
  longitude: number;
  latitude: number;
}

interface ProfileProps {
  userData: {
    id: number;
    name: string;
    email: string;
    userCity: CityProps;
    userList: CityProps[];
    listID: number;
  };

  citiesListForecast: cityForecastProps[];

  userCityForecast: cityForecastProps;

  isLogged: boolean;
}

export interface DateTimeFormatOptions {
  weekday?: "long" | "short" | "narrow";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}

type cityForecastProps = {
  location: {
    localtime: string;
  };

  forecast: {
    forecastday: {
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        maxwind_kph: number;
        condition: {
          code: number;
          icon: string;
        };
      };
    }[];
  };
};

type dataToRender = {
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxwind_kph: number;
    condition: {
      code: number;
      icon: string;
    };
  };
};

export type filteredForecastProps = {
  name: string;
  atualHour: string;
  cityWeather: dataToRender[];
};

const ProfilePage: React.FC<ProfileProps> = ({ userData, userCityForecast, citiesListForecast, isLogged }) => {
  //states

  //state with the data of each city from the api
  const [citiesListAllData, setCitiesListAllData] = useState<cityForecastProps[]>(citiesListForecast);
  //state only with the needed data to render
  const [citiesListFilteredData, setCitiesListFilteredData] = useState<filteredForecastProps[] | []>([]);
  //state with name and location params of each city of the list
  const [citiesList, setCitiesList] = useState<CityProps[] | []>(userData.userList);

  //state with the user city data from the api
  const [userCityAllData, setUserCityAllData] = useState<cityForecastProps>(userCityForecast);
  //state with the user city data only needed to render
  const [userCityFilteredData, setUserCityFilteredData] = useState<filteredForecastProps | {}>({});
  //state with name and location of the user's city
  const [userCity, setUserCity] = useState<CityProps>(userData.userCity);
console.log("userCity", userCityFilteredData)
  //state of the selected day index
  const [dayOfSearch, setDayOfSearch] = useState<number>(0);
  //state with the availables dates
  const [datesOfSearch, setDatesOfSearch] = useState<Date[]>([]);
  //state with the alert state, type and message
  const [alert, setAlert] = useState({ open: false, message: "", messageType: "" });
  //state for infoModal
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userCookie = getCookie("userToken");
  const condition: boolean = Object.keys(userCityFilteredData).length > 0 && citiesList.length !== 0;
  const targetRef = useRef<HTMLDivElement>(null);
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const options: DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  //state used to every time a city is added to the list or the user's city changed, update the data states
  useEffect(() => {
    dispatch(setIsLogged());

    //if the list is not empty, add every city data needed to render into the filtered array.
    if (citiesListAllData.length > 0) {
      const newArr = citiesListAllData.map((city, index) => {
        return {
          name: citiesList[index].name,
          atualHour: city.location.localtime,
          cityWeather: [...city.forecast.forecastday],
        };
      });
      setCitiesListFilteredData(newArr);
    }

    //if the user city is chosen, add the data needed to render into the filtered object
    if (userCityAllData) {
      const newObj = {
        name: userCity.name,
        atualHour: userCityAllData.location.localtime,
        cityWeather: [...userCityAllData.forecast.forecastday],
      };

      setUserCityFilteredData(newObj);
    }

    //get the days of the search. (today, and next 2 days)
    const getDaysOfSearch = () => {
      const today = new Date();

      const dates: Date[] = [];

      for (var i = 0; i < 3; i++) {
        var currentDate = new Date();
        currentDate.setDate(today.getDate() + i);
        dates.push(currentDate);
      }
      setDatesOfSearch(dates);
    };
    getDaysOfSearch();
    //runs everytime the list change, or the usercity is changed
  }, [citiesListAllData, userCity]);

  //function to handle a date change
  const handleNewDate = (day: number) => {
    //set the new day index
    setDayOfSearch(day);

    //send the user to the dashboard zone
    // targetRef.current?.scrollIntoView({ behavior: "smooth" });

    setAlert({
      open: true,
      message: "Date of the comparison was changed",
      messageType: "success",
    });
    //remove the alert
    setTimeout(() => {
      setAlert({
        ...alert,
        open: false,
      });
    }, 2000);
  };

  //function to handle the add of a new city
  const handleAddingNewCity = async (city: CityProps) => {
    //if the list is full or already has the city, send an alert and don't run the rest of the function
    if (citiesList.length > 3 || citiesList.some((cityList) => cityList.name === city.name)) {
      setAlert({
        open: true,
        message: "List is full/City is already in the list",
        messageType: "error",
      });

      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "error",
        });
      }, 2000);

      return;
    }

    try {
      //send a request to get the forecast od the new city
      const cityWeather = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${city.latitude},${city.longitude}&days=3&aqi=no&alerts=no`,
      );

      //send an request to xano, to replace the list with a new one
      const xanoResponse = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/lists/${userData.listID}`,
        {
          list_id: userData.listID,
          cities: [...citiesList, city],
        },

        { headers: { Authorization: "Bearer " + userCookie } },
      );

      //set the weather data, and other params of the newcity into the indicated lists
      setCitiesListAllData((prevData) => [...prevData, cityWeather.data]);
      setCitiesList((prevList) => [...prevList, city]);

      // sent the user to the dashboard zone
      // targetRef.current?.scrollIntoView({ behavior: "smooth" });

      //set an alert if succed
      setAlert({
        open: true,
        message: "City added to the List",
        messageType: "success",
      });

      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "success",
        });
      }, 2000);
    } catch (error: any) {
      //console.log the error and set an alert in case of something gone wrong
      console.log("error on the add handle:", error);
      setAlert({
        open: true,
        message: "Something gone wrong! Problaby for exceed of requests. This is a experimental web app. Try again in 30 seconds",
        messageType: "error",
      });
      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "error",
        });
      }, 5000);
    }
  };

  // function to delete a city from the list
  const handleDeleteCity = async (index: number) => {
    //if the list have just 1 city, set the list as empty, if not, set a new array without the deleted city
    const newList = citiesList.length === 1 ? [] : [...citiesList.slice(0, index), ...citiesList.slice(index + 1)];

    try {
      //send a request to xano, to replace the list with the new one
      const response = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/lists/${userData.listID}`,
        {
          list_id: userData.listID,
          cities: newList,
        },

        { headers: { Authorization: "Bearer " + userCookie } },
      );

      //store the new array into the indicated states
      setCitiesListAllData([...citiesListAllData.slice(0, index), ...citiesListAllData.slice(index + 1)]);
      setCitiesList(newList);

      //send an alert if succeed
      setAlert({
        open: true,
        message: `${citiesList[index].name} deleted from the list !`,
        messageType: "success",
      });

      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "success",
        });
      }, 2000);
    } catch (error: any) {
      setAlert({
        open: true,
        message: "Something gone wrong! Problaby for exceed of requests. This is an experimental web app. Try again in 30 seconds",
        messageType: "error",
      });
      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "error",
        });
      }, 5000);
    }
  };

  //function to handle new user's city
  const handleSetNewUserCity = async (city: CityProps) => {
    try {
      // requesting the weather data for the city
      const userCityData = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${city.latitude},${city.longitude}&days=6&aqi=no&alerts=no`,
      );

      //requesting the xano to change the user's city in its database
      const newCity = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/user/${userData.id}`,
        { userCity: city },
        {
          headers: {
            Authorization: "Bearer " + userCookie,
          },
        },
      );

      //set the new user data into the indicated states
      setUserCityAllData(userCityData.data);
      setUserCity(city);

      //sent the user to the dashboard zone
      // targetRef.current?.scrollIntoView({ behavior: "smooth" });

      //send an alert if all succeeds
      setAlert({
        open: true,
        message: "Your city was updated!",
        messageType: "success",
      });

      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "success",
        });
      }, 2000);
    } catch (e) {
      console.log(e);

      //send an alert if somthing gone wrong
      setAlert({
        open: true,
        message: "Something gone wrong! Problaby for exceed of requests. This is an experimental web app. Try again in 30 seconds",
        messageType: "error",
      });
      setTimeout(() => {
        setAlert({
          open: false,
          message: "",
          messageType: "error",
        });
      }, 5000);
    }
  };

  //function to Open info Modal
  const openInfoModal = () => {
    setInfoModalOpen(true);
  };

  //function to close the info modal
  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  return (
    <ProfilePageContainer>
      {alert.open && (
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={3500}>
          <Alert severity={alert.messageType === "success" ? "success" : "error"} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      <InputsListContainer>
        <ListContainer>
          <h2>My List of cities</h2>
          <SearchBarProfile handleNewInput={handleAddingNewCity} />
          {citiesList.length === 0 ? (
            <h3>list is empty</h3>
          ) : (
            citiesList.map((country, index) => (
              <CityListBox key={index}>
                <CityListText>{country.name}</CityListText>
                <CityListButton value={index} onClick={() => handleDeleteCity(index)}>
                  <TrashIcon />
                </CityListButton>
              </CityListBox>
            ))
          )}
        </ListContainer>
        <InputsContainer>
          <h2>{userCity.name.length === 0 ? "Please, select your city to compare with the list:" : `My current city is ${userCity.name}`}</h2>
          <SearchBarProfile handleNewInput={handleSetNewUserCity} />
          <h2>See the comparison for the following days</h2>
          <DateButtonsContainer>
            {datesOfSearch.map((day, index) => {
              const dayInString =
                index === 0
                  ? "Today"
                  : index === 1
                  ? "Tomorrow"
                  : day instanceof Date
                  ? day.toString().split(" ")[0] + ", " + day.toString().split(" ")[2]
                  : "";
              return (
                <DateButton $dayPicked={index === dayOfSearch} key={index} value={dayInString} onClick={() => handleNewDate(index)}>
                  {dayInString}{" "}
                </DateButton>
              );
            })}
          </DateButtonsContainer>
        </InputsContainer>
      </InputsListContainer>

      <DashBoardProfileSection ref={targetRef}>
        <InfoDashBoardButton data-testid="infoButton" onClick={openInfoModal}>
          <InfoIcon />
        </InfoDashBoardButton>
        {!condition ? (
          <h2>You have not selected your city or the list is empty.</h2>
        ) : (
          <>
            <h2>
              {dayOfSearch === 0
                ? `Today, ${new Date(datesOfSearch[dayOfSearch]).toLocaleDateString("en-US", options)}`
                : dayOfSearch === 1
                ? `Tomorrow, ${new Date(datesOfSearch[dayOfSearch]).toLocaleDateString("en-US", options)}`
                : datesOfSearch[dayOfSearch] instanceof Date
                ? new Date(datesOfSearch[dayOfSearch]).toLocaleDateString("en-US", options)
                : ""}
            </h2>
            <DashBoardUserCity userCityData={userCityFilteredData as filteredForecastProps} day={dayOfSearch} />
            <h3>Weather comparisons with your city, {userCity.name.split(",")[0]}:</h3>
          </>
        )}

        {condition && (
          <>
            <GridOfDashboards>
              {citiesListFilteredData.map((city, index) => (
                <DashboardProfile key={index} userCityData={userCityFilteredData as filteredForecastProps} cityListData={city} day={dayOfSearch} />
              ))}
            </GridOfDashboards>
          </>
        )}
      </DashBoardProfileSection>

      {infoModalOpen && (
        <InfoModalContainer data-testid="infoModal" onClick={closeInfoModal}>
          <BoxInfo onClick={stopPropagation}>
            <CloseInfoButton data-testid="closeInfoModalBtn" onClick={closeInfoModal}>
              <CloseIcon />
            </CloseInfoButton>
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
          </BoxInfo>
        </InfoModalContainer>
      )}
    </ProfilePageContainer>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookieToken = context.req.headers.cookie || "";
  const parsedCookie = cookie.parse(cookieToken);
  const tokenInsideCookie = parsedCookie.userToken || "";
  let citiesListForecast: cityForecastProps[] = [];
  let userCityForecast: cityForecastProps | {} = {};
  let isLogged = false;
  let authResponse;

  try {
    authResponse = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
      headers: {
        Authorization: "Bearer " + tokenInsideCookie,
      },
    });

    if (authResponse.data.userCity) {
      const userCity = authResponse.data.userCity;
      const userCityFilteredData = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${userCity.latitude},${userCity.longitude}&days=6&aqi=no&alerts=no`,
      );
      userCityForecast = userCityFilteredData.data;
    }

    if (authResponse.data.list.cities.length > 0) {
      // Use map to create an array of promises
      const promises = authResponse.data.list.cities.map(async (cityList: CityProps, index: number) => {
        const weatherData = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${cityList.latitude},${cityList.longitude}&days=6&aqi=no&alerts=no`,
        );
        return weatherData.data as cityForecastProps;
      });

      // Use Promise.all to wait for all promises to settle
      citiesListForecast = await Promise.all(promises);
    }
  } catch (error: any) {
    console.error("Error fetching authentication:", error.message);
    authResponse = { status: 500 };
  }

  if (!cookieToken || authResponse.status !== 200) {
    isLogged = false;
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const userData = {
    id: authResponse.data.id,
    name: authResponse.data.name,
    email: authResponse.data.email,
    userCity: authResponse.data.userCity,
    userList: authResponse.data.list.cities,
    listID: authResponse.data.list_id,
  };
  isLogged = true;

  return {
    props: { userData, userCityForecast, citiesListForecast, isLogged }, // Pass the entire response as a prop
  };
}

export default ProfilePage;
