
import styled from "styled-components";
import * as React from 'react';


const DashboardContainer = styled.div`
display: flex;
width: 800px;
flex-direction: column;
background-color: white;
margin: 50px;
padding: 20px;
border-radius: 20px;
`
const DashboardHeader = styled.div`
display: flex;
width: 100%;
background-color: #F0F8FF;
justify-content: space-around;
border: 1px solid black;
margin-bottom: 25px;
border-radius: 20px;
padding: 5px;
`
const WeatherMaxMinSection = styled.div`
display: flex;
gap: 15px;
`
const MaxTempSection = styled.div`
display: flex;
justify-content: center;
width: 50px;
background-color: #ff4d00;
border-radius: 50%
`
const MinTempSection = styled.div`
display: flex;
justify-content: center;
width: 50px;
background-color: #88b7df;
border-radius: 50%
`
const MaxWindSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%
`
const DateSection = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
font-weight: 600;
`
const CitySection = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
font-weight: 600;
`
const DashboardGrid = styled.div`
display: grid;
grid-template-columns: 1fr;
`
const HoursRow = styled.div`
display: flex;
justify-content: center;
border-bottom: 1px solid black;
p{
text-align: center;
    padding: 15px;
    border-right:1px solid black;
    border-left:1px solid black;
    margin: 0;
    width: 65px
}
`
const TemperaturesRow = styled.div`
display: flex;
justify-content: center;
p{
    text-align: center;
    padding: 15px;
    border-right:1px solid black;
    border-left:1px solid black;
    margin: 0;
    width: 65px
}
`
const IconsRow = styled.div`
display: flex;
justify-content: center;

svg {
    width: 80px; /* Set your desired width */
    height: 80px; /* Set your desired height */
    text-align: center;
    padding: 15px;
    border-right:1px solid black;
    border-left:1px solid black;
    margin: 0;
    width: 65px
  }
`

interface dashboardProps {
    temperaturesArr: number[]
    iconsArr: string[]
    dashboardData: {
        wind: Number;
        maxTemp: Number;
        minTemp: Number;
        cityName: string;
        date: string;
    }
}

const weatherIcon = (icon: string) => {
    switch (icon) {
        case "01d":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >
                <defs>
                    <linearGradient id="a" x1="26.75" y1="22.91" x2="37.25" y2="41.09" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#fbbf24" />
                        <stop offset="0.45" stopColor="#fbbf24" />
                        <stop offset="1" stopColor="#fbbf24" />
                    </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="10.5" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="0.5" fill="#fbbf24" />
                <path d="M32,15.71V9.5m0,45V48.29M43.52,20.48l4.39-4.39M16.09,47.91l4.39-4.39m0-23-4.39-4.39M47.91,47.91l-4.39-4.39M15.71,32H9.5m45,0H48.29" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3">
                    <animateTransform attributeName="transform" dur="45s" values="0 32 32; 360 32 32" repeatCount="indefinite" type="rotate" />
                </path></svg >;
        case "01n":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="21.92" y1="18.75" x2="38.52" y2="47.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#86c3db" />
                        <stop offset="0.45" stopColor="#86c3db" />
                        <stop offset="1" stopColor="#5eafcf" />
                        <animateTransform attributeName="gradientTransform" type="rotate" values="5 32 32; -15 32 32; 5 32 32" dur="10s" repeatCount="indefinite" />
                    </linearGradient>
                </defs>
                <path d="M46.66,36.2A16.66,16.66,0,0,1,29.88,19.65a16.29,16.29,0,0,1,.55-4.15A16.56,16.56,0,1,0,48.5,36.1C47.89,36.16,47.28,36.2,46.66,36.2Z" stroke="#72b9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="rotate" values="-5 32 32; 15 32 32; -5 32 32" dur="10s" repeatCount="indefinite" />
                </path>
            </svg>;
        case "02d":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
                </defs>
                <circle cx="19" cy="24" r="5" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="0.5" fill="#fbbf24" />
                <path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2">
                    <animateTransform attributeName="transform" type="rotate" values="0 19 24; 360 19 24" dur="45s" repeatCount="indefinite" />
                </path>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)" />
            </svg>;
        case "02n":

            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#86c3db" />
                        <stop offset="0.45" stopColor="#86c3db" />
                        <stop offset="1" stopColor="#5eafcf" />
                        <animateTransform attributeName="gradientTransform" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293" dur="10s" repeatCount="indefinite" />
                    </linearGradient>
                    <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                </defs>
                <path d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z" stroke="#72b9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293" dur="10s" repeatCount="indefinite" />
                </path>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)" />
            </svg>;
        case "03d":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
                </path>
            </svg>;
        case "03n":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
                </path>
            </svg>;
        case "04d":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="40.76" y1="23" x2="50.83" y2="40.46" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#9ca3af" />
                        <stop offset="0.45" stopColor="#9ca3af" />
                        <stop offset="1" stopColor="#6b7280" />
                    </linearGradient>
                    <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                </defs>
                <path d="M34.23,33.45a4.05,4.05,0,0,0,4.05,4H54.79a4.34,4.34,0,0,0,.81-8.61,3.52,3.52,0,0,0,.06-.66,4.06,4.06,0,0,0-6.13-3.48,6.08,6.08,0,0,0-11.25,3.19,6.34,6.34,0,0,0,.18,1.46h-.18A4.05,4.05,0,0,0,34.23,33.45Z" stroke="#848b98" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="translate" values="-2.1 0; 2.1 0; -2.1 0" dur="7s" repeatCount="indefinite" />
                </path>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)">
                    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
                </path>
            </svg>;
        case "04n":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="40.76" y1="23" x2="50.83" y2="40.46" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#9ca3af" />
                        <stop offset="0.45" stopColor="#9ca3af" />
                        <stop offset="1" stopColor="#6b7280" />
                    </linearGradient>
                    <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                </defs>
                <path d="M34.23,33.45a4.05,4.05,0,0,0,4.05,4H54.79a4.34,4.34,0,0,0,.81-8.61,3.52,3.52,0,0,0,.06-.66,4.06,4.06,0,0,0-6.13-3.48,6.08,6.08,0,0,0-11.25,3.19,6.34,6.34,0,0,0,.18,1.46h-.18A4.05,4.05,0,0,0,34.23,33.45Z" stroke="#848b98" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="translate" values="-2.1 0; 2.1 0; -2.1 0" dur="7s" repeatCount="indefinite" />
                </path>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)">
                    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
                </path>
            </svg>;
        case "09d":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                    <linearGradient id="b" x1="22.53" y1="42.95" x2="25.47" y2="48.05" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#4286ee" />
                        <stop offset="0.45" stopColor="#4286ee" />
                        <stop offset="1" stopColor="#0950bc" />
                    </linearGradient>
                    <linearGradient id="c" x1="29.53" y1="42.95" x2="32.47" y2="48.05" xlinkHref="#b" />
                    <linearGradient id="d" x1="36.53" y1="42.95" x2="39.47" y2="48.05" xlinkHref="#b" />
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)" />
                <line x1="24.39" y1="43.03" x2="23.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#b)">
                    <animateTransform attributeName="transform" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                </line>
                <line x1="31.39" y1="43.03" x2="30.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#c)">
                    <animateTransform attributeName="transform" begin="-0.4s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" begin="-0.4s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                </line>
                <line x1="38.39" y1="43.03" x2="37.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#d)">
                    <animateTransform attributeName="transform" begin="-0.2s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" begin="-0.2s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                </line>
            </svg>;
        case "09n":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                    <linearGradient id="b" x1="22.53" y1="42.95" x2="25.47" y2="48.05" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#4286ee" />
                        <stop offset="0.45" stopColor="#4286ee" />
                        <stop offset="1" stopColor="#0950bc" />
                    </linearGradient>
                    <linearGradient id="c" x1="29.53" y1="42.95" x2="32.47" y2="48.05" xlinkHref="#b" />
                    <linearGradient id="d" x1="36.53" y1="42.95" x2="39.47" y2="48.05" xlinkHref="#b" />
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)" />
                <line x1="24.39" y1="43.03" x2="23.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#b)">
                    <animateTransform attributeName="transform" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                </line>
                <line x1="31.39" y1="43.03" x2="30.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#c)">
                    <animateTransform attributeName="transform" begin="-0.4s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" begin="-0.4s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                </line>
                <line x1="38.39" y1="43.03" x2="37.61" y2="47.97" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="url(#d)">
                    <animateTransform attributeName="transform" begin="-0.2s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" begin="-0.2s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite" />
                </line>
            </svg>;
        case "10d":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
            </svg>;
        case "10n":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#86c3db" />
                        <stop offset="0.45" stopColor="#86c3db" />
                        <stop offset="1" stopColor="#5eafcf" />
                        <animateTransform attributeName="gradientTransform" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293" dur="10s" repeatCount="indefinite" />
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
                <path d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z" stroke="#72b9d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" fill="url(#a)">
                    <animateTransform attributeName="transform" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293" dur="10s" repeatCount="indefinite" />
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
            </svg>;;
        case "11d":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                    <linearGradient id="b" x1="26.74" y1="37.88" x2="35.76" y2="53.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f7b23b" />
                        <stop offset="0.45" stopColor="#f7b23b" />
                        <stop offset="1" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)" />
                <polygon points="30 36 26 48 30 48 28 58 38 44 32 44 36 36 30 36" stroke="#f6a823" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)">
                    <animate attributeName="opacity" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1" dur="2s" repeatCount="indefinite" />
                </polygon>
            </svg>;;
        case "11n":
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                    <linearGradient id="b" x1="26.74" y1="37.88" x2="35.76" y2="53.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f7b23b" />
                        <stop offset="0.45" stopColor="#f7b23b" />
                        <stop offset="1" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)" />
                <polygon points="30 36 26 48 30 48 28 58 38 44 32 44 36 36 30 36" stroke="#f6a823" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)">
                    <animate attributeName="opacity" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1" dur="2s" repeatCount="indefinite" />
                </polygon>
            </svg>;;
        case "13d":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                    <linearGradient id="b" x1="30.12" y1="43.48" x2="31.88" y2="46.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#86c3db" />
                        <stop offset="0.45" stopColor="#86c3db" />
                        <stop offset="1" stopColor="#5eafcf" />
                    </linearGradient>
                    <linearGradient id="c" x1="29.67" y1="42.69" x2="32.33" y2="47.31" xlinkHref="#b" />
                    <linearGradient id="d" x1="23.12" y1="43.48" x2="24.88" y2="46.52" xlinkHref="#b" />
                    <linearGradient id="e" x1="22.67" y1="42.69" x2="25.33" y2="47.31" xlinkHref="#b" />
                    <linearGradient id="f" x1="37.12" y1="43.48" x2="38.88" y2="46.52" xlinkHref="#b" />
                    <linearGradient id="g" x1="36.67" y1="42.69" x2="39.33" y2="47.31" xlinkHref="#b" />
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)" />
                <g>
                    <circle cx="31" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#b)" />
                    <path d="M33.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M31,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="url(#c)" />
                    <animateTransform attributeName="transform" type="translate" additive="sum" values="-1 -6; 1 12" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 31 45; 360 31 45" dur="9s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" />
                </g>
                <g>
                    <circle cx="24" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#d)" />
                    <path d="M26.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M24,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="url(#e)" />
                    <animateTransform attributeName="transform" type="translate" additive="sum" values="1 -6; -1 12" begin="-2s" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 24 45; 360 24 45" dur="9s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;1;0" begin="-2s" dur="4s" repeatCount="indefinite" />
                </g>
                <g>
                    <circle cx="38" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#f)" />
                    <path d="M40.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M38,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="url(#g)" />
                    <animateTransform attributeName="transform" type="translate" additive="sum" values="1 -6; -1 12" begin="-1s" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 38 45; 360 38 45" dur="9s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;1;0" begin="-1s" dur="4s" repeatCount="indefinite" />
                </g>
            </svg>;
        case "13n":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f3f7fe" />
                        <stop offset="0.45" stopColor="#f3f7fe" />
                        <stop offset="1" stopColor="#deeafb" />
                    </linearGradient>
                    <linearGradient id="b" x1="30.12" y1="43.48" x2="31.88" y2="46.52" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#86c3db" />
                        <stop offset="0.45" stopColor="#86c3db" />
                        <stop offset="1" stopColor="#5eafcf" />
                    </linearGradient>
                    <linearGradient id="c" x1="29.67" y1="42.69" x2="32.33" y2="47.31" xlinkHref="#b" />
                    <linearGradient id="d" x1="23.12" y1="43.48" x2="24.88" y2="46.52" xlinkHref="#b" />
                    <linearGradient id="e" x1="22.67" y1="42.69" x2="25.33" y2="47.31" xlinkHref="#b" />
                    <linearGradient id="f" x1="37.12" y1="43.48" x2="38.88" y2="46.52" xlinkHref="#b" />
                    <linearGradient id="g" x1="36.67" y1="42.69" x2="39.33" y2="47.31" xlinkHref="#b" />
                </defs>
                <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)" />
                <g>
                    <circle cx="31" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#b)" />
                    <path d="M33.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M31,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="url(#c)" />
                    <animateTransform attributeName="transform" type="translate" additive="sum" values="-1 -6; 1 12" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 31 45; 360 31 45" dur="9s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" />
                </g>
                <g>
                    <circle cx="24" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#d)" />
                    <path d="M26.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M24,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="url(#e)" />
                    <animateTransform attributeName="transform" type="translate" additive="sum" values="1 -6; -1 12" begin="-2s" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 24 45; 360 24 45" dur="9s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;1;0" begin="-2s" dur="4s" repeatCount="indefinite" />
                </g>
                <g>
                    <circle cx="38" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#f)" />
                    <path d="M40.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M38,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" strokeLinecap="round" strokeMiterlimit="10" stroke="url(#g)" />
                    <animateTransform attributeName="transform" type="translate" additive="sum" values="1 -6; -1 12" begin="-1s" dur="4s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 38 45; 360 38 45" dur="9s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;1;0" begin="-1s" dur="4s" repeatCount="indefinite" />
                </g>
            </svg>;
        case "50d":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="27.5" y1="17.21" x2="36.5" y2="32.79" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#d4d7dd" />
                        <stop offset="0.45" stopColor="#d4d7dd" />
                        <stop offset="1" stopColor="#bec1c6" />
                    </linearGradient>
                    <linearGradient id="b" y1="24.21" y2="39.79" xlinkHref="#a" />
                    <linearGradient id="c" y1="31.21" y2="46.79" xlinkHref="#a" />
                </defs>
                <line x1="17" y1="25" x2="47" y2="25" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" stroke="url(#a)">
                    <animateTransform attributeName="transform" type="translate" values="-4 0; 4 0; -4 0" dur="5s" begin="0s" repeatCount="indefinite" />
                </line>
                <line x1="17" y1="32" x2="47" y2="32" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" stroke="url(#b)">
                    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="5s" begin="-2s" repeatCount="indefinite" />
                </line>
                <line x1="17" y1="39" x2="47" y2="39" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" stroke="url(#c)">
                    <animateTransform attributeName="transform" type="translate" values="-4 0; 4 0; -4 0" dur="5s" begin="-4s" repeatCount="indefinite" />
                </line>
            </svg>;
        case "50n":
            return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
                <defs>
                    <linearGradient id="a" x1="27.5" y1="17.21" x2="36.5" y2="32.79" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#d4d7dd" />
                        <stop offset="0.45" stopColor="#d4d7dd" />
                        <stop offset="1" stopColor="#bec1c6" />
                    </linearGradient>
                    <linearGradient id="b" y1="24.21" y2="39.79" xlinkHref="#a" />
                    <linearGradient id="c" y1="31.21" y2="46.79" xlinkHref="#a" />
                </defs>
                <line x1="17" y1="25" x2="47" y2="25" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" stroke="url(#a)">
                    <animateTransform attributeName="transform" type="translate" values="-4 0; 4 0; -4 0" dur="5s" begin="0s" repeatCount="indefinite" />
                </line>
                <line x1="17" y1="32" x2="47" y2="32" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" stroke="url(#b)">
                    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="5s" begin="-2s" repeatCount="indefinite" />
                </line>
                <line x1="17" y1="39" x2="47" y2="39" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" stroke="url(#c)">
                    <animateTransform attributeName="transform" type="translate" values="-4 0; 4 0; -4 0" dur="5s" begin="-4s" repeatCount="indefinite" />
                </line>
            </svg>;

    }
}


const Dashboard: React.FC<dashboardProps> = ({ temperaturesArr, iconsArr, dashboardData }: dashboardProps) => {

    const hoursArray: string[] = ["00:00h", "03:00h", "06:00h", "09:00h", "12:00h", "15:00h", "18:00h", "21:00h"]
    const numOfTemps: number = temperaturesArr.length
    return (
        <DashboardContainer>
            <DashboardHeader>
                <WeatherMaxMinSection>
                    <MaxTempSection>
                        <p>{dashboardData.maxTemp.toFixed(0).toString()}º</p>
                    </MaxTempSection>
                    <MinTempSection>
                        <p>{dashboardData.minTemp.toFixed(0).toString()}º</p>
                    </MinTempSection>
                    <MaxWindSection>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z" fill="#1C274C" />
                            <path opacity="0.4" d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C" />
                            <path opacity="0.7" d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z" fill="#1C274C" />
                        </svg>
                        <p>{dashboardData.wind.toString()} km/h</p>
                    </MaxWindSection>
                </WeatherMaxMinSection>
                <DateSection>{dashboardData.date}</DateSection>
                <CitySection>{dashboardData.cityName}</CitySection>
            </DashboardHeader>
            <DashboardGrid>
                <HoursRow>{hoursArray.slice(-Math.abs(numOfTemps)).map((hour, index) => (<p key={index}>{hour}</p>))}</HoursRow>
                <IconsRow>{iconsArr.map((icon, index) => (<React.Fragment key={index}>{weatherIcon(icon)}</React.Fragment>))}</IconsRow>
                <TemperaturesRow>{temperaturesArr.map((temp, index) => (<p key={index}>{temp.toFixed(0)}º</p>))}</TemperaturesRow>
            </DashboardGrid>
        </DashboardContainer>
    )
}

export default Dashboard