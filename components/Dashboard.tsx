import styled from "styled-components";
import * as React from "react";
import { DateTimeFormatOptions } from "@/pages/Profile";
import DateIcon from "./icons/DateIcon";
import LocalIcon from "./icons/LocalIcon";
import WindIcon from "./icons/WindIcon";

const DashboardContainer = styled.div`
  display: flex;
  margin: 50px 0;
  border-radius: 20px;
  animation: slidein 1.5s ease-in-out;

  @keyframes slidein {
    from {
      transform: translateX(-200%);
    }

    to {
      transform: translateX(0%);
    }
  }
`;
const DashboardTable = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-width: 400px;
  border: 1px solid black;
  border-radius: 20px 0 0 20px;
  background: linear-gradient(180deg, rgba(87, 167, 209, 1) 1%, rgba(255, 255, 255, 1) 100%);

  @media (max-width: 800px) {
    background: linear-gradient(180deg, rgba(87, 167, 209, 1) 1%, rgba(255, 255, 255, 1) 150%);
    border-radius: 20px 0 20px 20px;
    min-width: 0;
  }
`;
const DashboardSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border: solid black;
  border-width: 1px 1px 1px 0;
  border-radius: 0 20px 20px 0;
  padding: 0 5px;
  @media (max-width: 800px) {
    height: 250px;
  }
`;
const DashboardHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: #f0f8ff;
  justify-content: space-around;
  border: 1px solid black;
  margin-bottom: 25px;
  border-radius: 20px;
  padding: 5px;
  gap: 10px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
export const MaxTempIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #ff9b50;
  border-radius: 50%;
`;
export const MinTempIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #a6f6ff;
  border-radius: 50%;
`;
const MaxWindIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  p {
    margin: 0;
    font-size: 17px;
  }
`;
const DateSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;
const CitySection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const HoursRow = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid black;

  p {
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    padding: 5px;
    border-right: 1px solid black;
    border-left: 1px solid black;
    margin: 0;
    width: 65px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    border: none;

    p {
      align-items: center;
      justify-content: center;
      height: 80px;
      text-align: center;
      padding: 5px;
      border: solid black;
      border-width: 1px 1px 1px 0;
      margin: 0;
      width: auto;
    }
  }
`;
const TemperaturesRow = styled.div`
  display: flex;
  justify-content: center;
  p {
    text-align: center;
    align-content: center;
    justify-items: center;
    padding: 5px;
    border-right: 1px solid black;
    border-left: 1px solid black;
    margin: 0;
    width: 65px;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    p {
      display: flex;
      height: 80px;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border: solid black;
      border-width: 1px 0;
      margin: 0;
      width: auto;
    }
  }
`;
const IconsRow = styled.div`
  display: flex;
  justify-content: center;

  svg {
    height: 80px;
    text-align: center;
    padding: 5px;
    border: solid black;
    border-width: 0 1px;
    margin: 0;
    width: 65px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    svg {
      border: solid black;
      border-width: 1px 0;
      width: auto;
    }
  }
`;

interface dashboardProps {
  temperaturesArr: number[];
  iconsArr: string[];
  dashboardData: {
    wind: Number;
    maxTemp: Number;
    minTemp: Number;
    cityName: string;
    date: string;
  };
}

const weatherIcon = (icon: string) => {
  switch (icon) {
    case "01d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="a" x1="26.75" y1="22.91" x2="37.25" y2="41.09" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#B8BEC3" />
              <stop offset="0.45" stopColor="#B8BEC3" />
              <stop offset="1" stopColor="#B8BEC3" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="10.5" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="0.5" fill="#fbbf24" />
          <path
            d="M32,15.71V9.5m0,45V48.29M43.52,20.48l4.39-4.39M16.09,47.91l4.39-4.39m0-23-4.39-4.39M47.91,47.91l-4.39-4.39M15.71,32H9.5m45,0H48.29"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="3"
          >
            <animateTransform attributeName="transform" dur="45s" values="0 32 32; 360 32 32" repeatCount="indefinite" type="rotate" />
          </path>
        </svg>
      );
    case "01n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="a" x1="21.92" y1="18.75" x2="38.52" y2="47.52" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#86c3db" />
              <stop offset="0.45" stopColor="#86c3db" />
              <stop offset="1" stopColor="#5eafcf" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values="5 32 32; -15 32 32; 5 32 32"
                dur="10s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>
          <path
            d="M46.66,36.2A16.66,16.66,0,0,1,29.88,19.65a16.29,16.29,0,0,1,.55-4.15A16.56,16.56,0,1,0,48.5,36.1C47.89,36.16,47.28,36.2,46.66,36.2Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform attributeName="transform" type="rotate" values="-5 32 32; 15 32 32; -5 32 32" dur="10s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "02d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
          <path
            d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform attributeName="transform" type="rotate" values="0 19 24; 360 19 24" dur="45s" repeatCount="indefinite" />
          </path>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#b)"
          />
        </svg>
      );
    case "02n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#86c3db" />
              <stop offset="0.45" stopColor="#86c3db" />
              <stop offset="1" stopColor="#5eafcf" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"
                dur="10s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f3f7fe" />
              <stop offset="0.45" stopColor="#f3f7fe" />
              <stop offset="1" stopColor="#deeafb" />
            </linearGradient>
          </defs>
          <path
            d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#b)"
          />
        </svg>
      );
    case "03d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f3f7fe" />
              <stop offset="0.45" stopColor="#f3f7fe" />
              <stop offset="1" stopColor="#deeafb" />
            </linearGradient>
          </defs>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "03n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="a" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#f3f7fe" />
              <stop offset="0.45" stopColor="#f3f7fe" />
              <stop offset="1" stopColor="#deeafb" />
            </linearGradient>
          </defs>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "04d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
          <path
            d="M34.23,33.45a4.05,4.05,0,0,0,4.05,4H54.79a4.34,4.34,0,0,0,.81-8.61,3.52,3.52,0,0,0,.06-.66,4.06,4.06,0,0,0-6.13-3.48,6.08,6.08,0,0,0-11.25,3.19,6.34,6.34,0,0,0,.18,1.46h-.18A4.05,4.05,0,0,0,34.23,33.45Z"
            stroke="#848b98"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform attributeName="transform" type="translate" values="-2.1 0; 2.1 0; -2.1 0" dur="7s" repeatCount="indefinite" />
          </path>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#b)"
          >
            <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "04n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
          <path
            d="M34.23,33.45a4.05,4.05,0,0,0,4.05,4H54.79a4.34,4.34,0,0,0,.81-8.61,3.52,3.52,0,0,0,.06-.66,4.06,4.06,0,0,0-6.13-3.48,6.08,6.08,0,0,0-11.25,3.19,6.34,6.34,0,0,0,.18,1.46h-.18A4.05,4.05,0,0,0,34.23,33.45Z"
            stroke="#848b98"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform attributeName="transform" type="translate" values="-2.1 0; 2.1 0; -2.1 0" dur="7s" repeatCount="indefinite" />
          </path>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#b)"
          >
            <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite" />
          </path>
        </svg>
      );
    case "09d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          />
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
        </svg>
      );
    case "09n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          />
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
        </svg>
      );
    case "10d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
          <path
            d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform attributeName="transform" type="rotate" values="0 19 24; 360 19 24" dur="45s" repeatCount="indefinite" />
          </path>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#b)"
          />
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
        </svg>
      );
    case "10n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="a" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#86c3db" />
              <stop offset="0.45" stopColor="#86c3db" />
              <stop offset="1" stopColor="#5eafcf" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"
                dur="10s"
                repeatCount="indefinite"
              />
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
          <path
            d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            fill="url(#a)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#b)"
          />
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
        </svg>
      );
    case "11d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          />
          <polygon points="30 36 26 48 30 48 28 58 38 44 32 44 36 36 30 36" stroke="#f6a823" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)">
            <animate attributeName="opacity" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1" dur="2s" repeatCount="indefinite" />
          </polygon>
        </svg>
      );
    case "11n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          />
          <polygon points="30 36 26 48 30 48 28 58 38 44 32 44 36 36 30 36" stroke="#f6a823" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)">
            <animate attributeName="opacity" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1" dur="2s" repeatCount="indefinite" />
          </polygon>
        </svg>
      );
    case "13d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          />
          <g>
            <circle cx="31" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#b)" />
            <path
              d="M33.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M31,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="url(#c)"
            />
            <animateTransform attributeName="transform" type="translate" additive="sum" values="-1 -6; 1 12" dur="4s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 31 45; 360 31 45" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" />
          </g>
          <g>
            <circle cx="24" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#d)" />
            <path
              d="M26.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M24,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="url(#e)"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              additive="sum"
              values="1 -6; -1 12"
              begin="-2s"
              dur="4s"
              repeatCount="indefinite"
            />
            <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 24 45; 360 24 45" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" begin="-2s" dur="4s" repeatCount="indefinite" />
          </g>
          <g>
            <circle cx="38" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#f)" />
            <path
              d="M40.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M38,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="url(#g)"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              additive="sum"
              values="1 -6; -1 12"
              begin="-1s"
              dur="4s"
              repeatCount="indefinite"
            />
            <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 38 45; 360 38 45" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" begin="-1s" dur="4s" repeatCount="indefinite" />
          </g>
        </svg>
      );
    case "13n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
          <path
            d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="0.5"
            fill="url(#a)"
          />
          <g>
            <circle cx="31" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#b)" />
            <path
              d="M33.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M31,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="url(#c)"
            />
            <animateTransform attributeName="transform" type="translate" additive="sum" values="-1 -6; 1 12" dur="4s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 31 45; 360 31 45" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" />
          </g>
          <g>
            <circle cx="24" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#d)" />
            <path
              d="M26.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M24,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="url(#e)"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              additive="sum"
              values="1 -6; -1 12"
              begin="-2s"
              dur="4s"
              repeatCount="indefinite"
            />
            <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 24 45; 360 24 45" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" begin="-2s" dur="4s" repeatCount="indefinite" />
          </g>
          <g>
            <circle cx="38" cy="45" r="1.25" fill="none" strokeMiterlimit="10" stroke="url(#f)" />
            <path
              d="M40.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M38,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="url(#g)"
            />
            <animateTransform
              attributeName="transform"
              type="translate"
              additive="sum"
              values="1 -6; -1 12"
              begin="-1s"
              dur="4s"
              repeatCount="indefinite"
            />
            <animateTransform attributeName="transform" type="rotate" additive="sum" values="0 38 45; 360 38 45" dur="9s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;1;0" begin="-1s" dur="4s" repeatCount="indefinite" />
          </g>
        </svg>
      );
    case "50d":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
        </svg>
      );
    case "50n":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
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
        </svg>
      );
  }
};

const Dashboard: React.FC<dashboardProps> = ({ temperaturesArr, iconsArr, dashboardData }: dashboardProps) => {
  const hoursArray: string[] = ["00:00h", "03:00h", "06:00h", "09:00h", "12:00h", "15:00h", "18:00h", "21:00h"];
  const numOfTemps: number = temperaturesArr.length;
  const fullDate = new Date(dashboardData.date);
  const weekDay = fullDate.toLocaleDateString("en-US", { weekday: "long" });
  const cityAbrName = dashboardData.cityName.split(",")[0];
  const todayDate = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
  const options: DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return (
    <DashboardContainer>
      <DashboardTable>
        <DashboardHeader>
          <DateSection>
            <DateIcon />
            {todayDate === dashboardData.date ? "Today" : tomorrowDate === dashboardData.date ? "Tomorrow" : weekDay}
          </DateSection>
          <CitySection>
            <LocalIcon />
            {cityAbrName}
          </CitySection>
        </DashboardHeader>
        <DashboardGrid>
          <HoursRow>
            {hoursArray.slice(-Math.abs(numOfTemps)).map((hour, index) => (
              <p key={index}>{hour}</p>
            ))}
          </HoursRow>
          <IconsRow>
            {iconsArr.map((icon, index) => (
              <React.Fragment key={index}>{weatherIcon(icon)}</React.Fragment>
            ))}
          </IconsRow>
          <TemperaturesRow>
            {temperaturesArr.map((temp, index) => (
              <p key={index}>{temp.toFixed(0)}º</p>
            ))}
          </TemperaturesRow>
        </DashboardGrid>
      </DashboardTable>

      <DashboardSidebar>
        <MaxTempIcon>
          <p>{dashboardData.maxTemp.toFixed(0).toString()}º</p>
        </MaxTempIcon>
        <MinTempIcon>
          <p>{dashboardData.minTemp.toFixed(0).toString()}º</p>
        </MinTempIcon>
        <MaxWindIcon>
          <WindIcon />
          <p>{dashboardData.wind.toFixed(1).toString()}</p>
        </MaxWindIcon>
      </DashboardSidebar>
    </DashboardContainer>
  );
};

export default Dashboard;
