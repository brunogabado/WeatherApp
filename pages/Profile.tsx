import * as React from 'react';
import { GetServerSidePropsContext } from 'next';
import styled from "styled-components";
import axios, { Axios } from "axios";
import cookie from 'cookie'
import { getCookie } from 'cookies-next';
import { useState, useEffect, useRef } from 'react';
import SearchBarProfile from '@/components/SearchbarProfile';
import DashboardProfile from '@/components/DashboardProfile';
import { setIsLogged } from '@/state/user/userSlice';
import { useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material/';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
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

@media (max-width: 900px) {
    width: calc(100% - 60px);
 flex-direction: column;
padding-bottom: 60px;
}

@media (max-width: 500px) {
border-bottom-left-radius: 35px;
border-bottom-right-radius: 35px;
}
`
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

    @media (max-width: 900px) {
width: 90%;
}
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
`
const DateButtonsContainer = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   flex-wrap: wrap;
   gap: 30px;
   justify-content: center;
   margin-top: 50px;

   @media (max-width: 500px) {
margin-top: 20px;
gap: 10px;
}

   @media (max-width: 900px) {
margin-top: 20px;
}
`
const DateButton = styled.button`
    background-color: #57a7d1;
    border:1px solid white;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    height: 60px;
    width: 200px;
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

    
  @media (max-width: 1500px) {
 width: 120px;
}

@media (max-width: 1200px) {
 width: 100px;
}

@media (max-width: 900px) {
 width: 100px;
}

@media (max-width: 350px) {
 width: 90px;
}
`
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

h2{
    width: 100%;
    padding: 10px;
    text-align: center;
    border-bottom: 2px solid white;
}


@media (max-width: 500px) {
width: calc(100% - 40px);
 padding: 20px;
border-top-left-radius: 35px;
border-top-right-radius: 35px;

}

`
const GridOfDashboards = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
color: white;
width: 100%;
justify-content: center;
/* margin: 50px 0; */
gap: 50px;

@media (max-width: 500px) {
 padding: 20px;
 gap: 0px;
}
`
const InfoContainer = styled.div`
    display: flex;
    padding: 50px;
    width: calc(100% - 100px);
    justify-content: space-around;

    @media (max-width: 900px) {
flex-direction: column;
height: auto;
align-items: center;
gap: 50px;
}

@media (max-width: 500px) {
gap: 0;
}
`
const ImageInfo = styled.img`
 width: 600px;
 transform: rotate(10deg);

 @media (max-width: 1150px) {
width: 400px;
  }

  @media (max-width: 500px) {
width: 280px;
}
`
const BoxInfo = styled.div`
display: flex;
flex-direction: column;
border: 2px solid black;
width: 400px;
padding: 30px;
border-radius: 25px;

h2{
    @media (max-width: 500px) {
font-size: 19px;
width: 280px;
}
}

ul{
    display: flex;
    flex-direction: column;
    font-size: 22px;
    font-weight: 600;
    height: 100%;
    justify-content: space-around;

    @media (max-width: 500px) {
 padding: 0;
 width: 280px;
}
}
li{
        display: flex;
        align-items: center;
        gap: 15px;

        @media (max-width: 500px) {
 transform: scale(0.8)
}
}

svg{
     width: 60px;
    height: 60px;
    }

@media (max-width: 1150px) {
 width: 300px;
}

@media (max-width: 500px) {
 padding: 15px;
 width: 280px;
transform: scale(0.8);
}
`
const InfoHourIcon = styled.div`
    display: flex;
    width: 45px;
    height: 20px;
    color: white;
    border: 3px solid white;
    border-radius: 20px;
`
const InfoMaxTempIcon = styled.div`
display: flex;
background-color: #FF9B50;
width: 50px;
height: 50px;
border-radius: 50%;
`
const InfoMinTempIcon = styled(InfoMaxTempIcon)`
background-color: #A6F6FF;
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
    },

    citiesListForecast: cityForecastProps[],

    userCityForecast: cityForecastProps,

    isLogged: boolean
}

interface DateTimeFormatOptions {
    weekday?: 'long' | 'short' | 'narrow';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
}

type cityForecastProps = {
    location: {
        localtime: string,
    },

    forecast: {
        forecastday: {
            day: {
                maxtemp_c: number,
                mintemp_c: number,
                maxwind_kph: number,
                condition: {
                    code: number,
                    icon: string
                }
            }
        }[]
    }
}

type dataToRender = {
    day: {
        maxtemp_c: number,
        mintemp_c: number,
        maxwind_kph: number,
        condition: {
            code: number,
            icon: string
        }
    }
}

export type filteredForecastProps = {
    name: string,
    atualHour: string,
    cityWeather: dataToRender[],
}

const ProfilePage: React.FC<ProfileProps> = ({ userData, userCityForecast, citiesListForecast, isLogged }) => {

    //states
    const [citiesListAllData, setCitiesListAllData] = useState<cityForecastProps[]>(citiesListForecast)
    const [citiesList, setCitiesList] = useState<CityProps[] | []>(userData.userList)
    const [userCity, setUserCity] = useState<CityProps>(userData.userCity);
    const [dayOfSearch, setDayOfSearch] = useState<number>(0)
    const [datesOfSearch, setDatesOfSearch] = useState<Date[]>([])
    const [userCityData, setUserCityData] = useState<filteredForecastProps | {}>({})
    const [citiesListData, setCitiesListData] = useState<filteredForecastProps[] | []>([])
    const [alert, setAlert] = useState({ open: false, message: "", messageType: "" });

    const dispatch = useDispatch()
    const userCookie = getCookie('userToken')
    const condition: boolean = userCity.name !== "" && citiesList.length !== 0;
    const targetRef = useRef<HTMLDivElement>(null);
    const options: DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };


    useEffect(() => {

        dispatch(setIsLogged())

        if (citiesListAllData.length > 0) {
            const newArr = citiesListAllData.map((city, index) => {
                return {
                    name: citiesList[index].name,
                    atualHour: city.location.localtime,
                    cityWeather: [...city.forecast.forecastday]
                }
            })
            setCitiesListData(newArr)
        }

        if (userCityForecast) {
            const newObj = {
                name: userCity.name,
                atualHour: userCityForecast.location.localtime,
                cityWeather: [...userCityForecast.forecast.forecastday]

            }

            setUserCityData(newObj)
        }


        const getDaysOfSearch = () => {
            const today = new Date()

            const dates: Date[] = []

            for (var i = 0; i < 3; i++) {
                var currentDate = new Date();
                currentDate.setDate(today.getDate() + i);
                dates.push(currentDate)
            }
            setDatesOfSearch(dates)
        }
        getDaysOfSearch()

    }, [userCity, citiesListAllData])


    const handleNewDate = (day: number) => {
        setDayOfSearch(day)
        targetRef.current?.scrollIntoView({ behavior: 'smooth' })
        setAlert({
            open: true,
            message: "Date of the comparison was changed",
            messageType: "success"
        })

        setTimeout(() => {
            setAlert({
                open: false,
                message: "",
                messageType: "success"
            })

        }, 2000)
    }

    const handleAddingNewCity = async (city: CityProps) => {
        if (citiesList.length > 3 || citiesList.some(cityList => cityList.name === city.name)) {
            setAlert({
                open: true,
                message: "List is full/City is already in the list",
                messageType: "error"
            })

            setTimeout(() => {
                setAlert({
                    open: false,
                    message: "",
                    messageType: "success"
                })
            }, 2000)
            return
        }

        try {
            const xanoResponse = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/lists/${userData.listID}`,
                {
                    list_id: userData.listID,
                    cities: [...citiesList, city]
                },

                { headers: { Authorization: "Bearer " + userCookie } })

            const cityWeather = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${city.latitude},${city.longitude}&days=3&aqi=no&alerts=no`);

            setCitiesListAllData(prevData => [...prevData, cityWeather.data]);
            setCitiesList(prevList => [...prevList, city]);
            setAlert({
                open: true,
                message: "City added to the List",
                messageType: "success"
            })


            setTimeout(() => {
                setAlert({
                    open: false,
                    message: "",
                    messageType: "success"
                })
            }, 2000)
        } catch (e) {
            console.log(e)
        }

    }

    const handleDeleteCity = async (index: number) => {
        const newList = citiesList.length === 1 ? [] : [...citiesList.slice(0, index), ...citiesList.slice(index + 1)]

        try {
            const response = await axios.patch(`https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/lists/${userData.listID}`,
                {
                    list_id: userData.listID,
                    cities: newList
                },

                { headers: { Authorization: "Bearer " + userCookie } })

            setCitiesListAllData([...citiesListAllData.slice(0, index), ...citiesListAllData.slice(index + 1)])
            setCitiesList(newList)

            setAlert({
                open: true,
                message: `${citiesList[index].name} deleted from the list !`,
                messageType: "success"
            })

            setTimeout(() => {
                setAlert({
                    open: false,
                    message: "",
                    messageType: "success"
                })

            }, 2000)


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
        setAlert({
            open: true,
            message: "Your city was updated!",
            messageType: "success"
        })

        setTimeout(() => {
            setAlert({
                open: false,
                message: "",
                messageType: "success"
            })

        }, 2000)

    }


    return (
        <ProfilePageContainer>
            {alert.message.length > 0 !== null && alert.messageType === "success" ?
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert.open} autoHideDuration={6000}>
                    <Alert severity="success" sx={{ width: '100%' }}>{alert.message}</Alert>
                </Snackbar> :
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert.open} autoHideDuration={6000}>
                    <Alert severity="error" sx={{ width: '100%' }}>{alert.message}</Alert>
                </Snackbar>}

            <InputsListContainer>
                <ListContainer>
                    <h2>My List of cities</h2>
                    <SearchBarProfile handleNewInput={handleAddingNewCity} />
                    {citiesList.length === 0 ? <h3>list is empty</h3> : citiesList.map((country, index) =>
                        <CityListBox key={index}><CityListText>{country.name}</CityListText>
                            <CityListButton value={index} onClick={() => handleDeleteCity(index)}><svg key="11" width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M779.5 1002.7h-535c-64.3 0-116.5-52.3-116.5-116.5V170.7h768v715.5c0 64.2-52.3 116.5-116.5 116.5zM213.3 256v630.1c0 17.2 14 31.2 31.2 31.2h534.9c17.2 0 31.2-14 31.2-31.2V256H213.3z" fill="#3688FF" /><path d="M917.3 256H106.7C83.1 256 64 236.9 64 213.3s19.1-42.7 42.7-42.7h810.7c23.6 0 42.7 19.1 42.7 42.7S940.9 256 917.3 256zM618.7 128H405.3c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7h213.3c23.6 0 42.7 19.1 42.7 42.7S642.2 128 618.7 128zM405.3 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7S448 403 448 426.6v256c0 23.6-19.1 42.7-42.7 42.7zM618.7 725.3c-23.6 0-42.7-19.1-42.7-42.7v-256c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v256c-0.1 23.6-19.2 42.7-42.7 42.7z" fill="#5F6379" /></svg></CityListButton>
                        </CityListBox>)}

                </ListContainer>
                <InputsContainer>
                    <h2>{userCity.name.length === 0 ? "Please, select your city to compare with the list:" : `My current city is ${userCity.name}`}</h2>
                    <SearchBarProfile handleNewInput={handleSetNewUserCity} />
                    <DateButtonsContainer>
                        {datesOfSearch.map((day, index) => {
                            const dayInString = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : day instanceof Date ? day.toString().split(' ')[0] + ', ' + day.toString().split(' ')[2] : '';
                            return (<DateButton key={index} value={dayInString} onClick={() => handleNewDate(index)} >{dayInString} </DateButton>);
                        })}
                    </DateButtonsContainer>
                </InputsContainer>
            </InputsListContainer>

            <InfoContainer>
                <ImageInfo src='paperAirplane.png' />
                <BoxInfo>
                    <h2>Get all the daily comparison between your city, and a list created by yourself!</h2>
                    <ul>
                        <li><InfoHourIcon />Local hour (at the moment)</li>

                        <li>
                            <svg key="1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                                <defs>
                                    <linearGradient id="a" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#fbbf24" />
                                        <stop offset="0.45" stopColor="#fbbf24" />
                                        <stop offset="1" stopColor="#f59e0b" />
                                    </linearGradient>
                                    <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#f3f7fe" />
                                        <stop offset="0.45" stopColor="#f3f7fe" />
                                        <stop offset="1" stopColor="#deeafb" />
                                    </linearGradient>
                                    <linearGradient id="c" x1="22.53" y1="42.95" x2="25.47" y2="48.05" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#4286ee" />
                                        <stop offset="0.45" stopColor="#4286ee" />
                                        <stop offset="1" stopColor="#0950bc" />
                                    </linearGradient>
                                    <linearGradient id="d" x1="29.53" y1="42.95" x2="32.47" y2="48.05" xlinkHref="#c" />
                                    <linearGradient id="e" x1="36.53" y1="42.95" x2="39.47" y2="48.05" xlinkHref="#c" />
                                </defs>
                                <circle cx="19" cy="24" r="5" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="0.5" fill="#fbbf24" />
                                <path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2">
                                    <animateTransform attributeName="transform" type="rotate" values="0 19 24; 360 19 24" dur="45s" repeatCount="indefinite" />
                                </path>
                                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)" />
                                <line x1="24.39" y1="43.03" x2="23.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#c)">
                                    <animateTransform attributeName="transform" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                                </line>
                                <line x1="31.39" y1="43.03" x2="30.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#d)">
                                    <animateTransform attributeName="transform" begin="-0.4s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" begin="-0.4s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                                </line>
                                <line x1="38.39" y1="43.03" x2="37.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#e)">
                                    <animateTransform attributeName="transform" begin="-0.2s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" begin="-0.2s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                                </line>
                            </svg>Icon with the state of the weather <br></br>(of the selected day)
                        </li>

                        <li><InfoMaxTempIcon />Maximum Temperature <br></br>(of the selected day)</li>

                        <li><InfoMinTempIcon />Minimum Temperature <br></br>(of the selected day)</li>

                        <li>
                            <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z" fill="#1C274C" />
                                <path opacity="0.4" d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C" />
                                <path opacity="0.7" d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z" fill="#1C274C" />
                            </svg>Maximum Wind Speed <br></br>(of the selected day)
                        </li>
                    </ul>
                </BoxInfo>
            </InfoContainer>

            <DashBoardProfileSection ref={targetRef}>
                {!condition ? <h2>You have not selected your city or the list is empty.</h2> :
                    <h2>{dayOfSearch === 0 ? `Today, ${new Date(datesOfSearch[dayOfSearch]).toLocaleDateString('en-US', options)}` :
                        dayOfSearch === 1 ? `Tomorrow, ${new Date(datesOfSearch[dayOfSearch]).toLocaleDateString('en-US', options)}` :
                            datesOfSearch[dayOfSearch] instanceof Date ?
                                new Date(datesOfSearch[dayOfSearch]).toLocaleDateString('en-US', options) : ''}</h2>}

                {condition &&
                    <GridOfDashboards>
                        {citiesListData.map((city, index) => <DashboardProfile key={index} userCityData={userCityData as filteredForecastProps} cityListData={city} day={dayOfSearch} />)}
                    </GridOfDashboards>}
            </DashBoardProfileSection>
        </ProfilePageContainer>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookieToken = context.req.headers.cookie || "";
    const parsedCookie = cookie.parse(cookieToken);
    const tokenInsideCookie = parsedCookie.userToken || "";
    let citiesListForecast: cityForecastProps[] = [];
    let userCityForecast: cityForecastProps | {} = {}
    let isLogged = false
    let authResponse;

    try {
        authResponse = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
            headers: {
                Authorization: "Bearer " + tokenInsideCookie
            }
        });

        if (authResponse.data.userCity) {
            const userCity = authResponse.data.userCity
            const userCityData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${userCity.latitude},${userCity.longitude}&days=6&aqi=no&alerts=no`)
            userCityForecast = userCityData.data
        }


        if (authResponse.data.list.cities.length > 0) {
            // Use map to create an array of promises
            const promises = authResponse.data.list.cities.map(async (cityList: CityProps, index: number) => {
                const weatherData = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=86ee320b28bc4482bf2183917232011&q=${cityList.latitude},${cityList.longitude}&days=6&aqi=no&alerts=no`);
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
                destination: '/',
            },
        };
    }

    const userData = {
        id: authResponse.data.id,
        name: authResponse.data.name,
        email: authResponse.data.email,
        userCity: authResponse.data.userCity,
        userList: authResponse.data.list.cities,
        listID: authResponse.data.list_id
    }
    isLogged = true

    return {
        props: { userData, userCityForecast, citiesListForecast, isLogged }, // Pass the entire response as a prop
    };
}

export default ProfilePage;