import { filteredForecastProps } from "@/pages/Profile";
import styled from "styled-components";

const DashboardContainer = styled.div`
  width: 300px;
  background: linear-gradient(180deg, rgba(87, 167, 209, 1) 1%, rgba(255, 255, 255, 1) 200%);
  border: 2px solid white;
  border-radius: 30px;
  padding: 20px;
  margin: 50px 0;

  @media (max-width: 500px) {
    transform: scale(0.8);
    margin: 0;
    padding: 0 20px;
  }
`;
const DashboardGridLeft = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  width: 50%;
  justify-content: center;
  align-items: center;
  justify-items: center;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
`;
const DashboardGridRight = styled(DashboardGridLeft)`
  border-right: none;
`;
const DashboardHeader = styled.div`
  display: flex;
  width: 100%;
  color: white;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid white;

  h4 {
    text-align: center;
  }
`;
const DashboardTitle = styled.h3`
  display: flex;
  min-width: 50%;
  margin: 0;
  padding: 20px 0;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const DashboardIconBox = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: 90px;
    text-align: center;
    padding: 5px;
    margin: 0;
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
const DashboardTable = styled.div`
  display: flex;
`;
const DashboardTempMaxBox = styled.div`
  display: flex;
  color: black;
  justify-content: center;
  background-color: #ff9b50;
  align-items: center;
  font-size: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;
const DashboardTempMinBox = styled(DashboardTempMaxBox)`
  background-color: #a6f6ff;
`;
const DashboardWindBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 5px 15px 5px;
  font-size: 20px;
`;
const DashboardHourBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  border: 3px solid white;
  padding: 10px;
  border-radius: 20px;
  font-weight: 600;
`;
const DashboardFooterText = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

interface DashboardProfileProps {
  userCityData: filteredForecastProps;
  cityListData: filteredForecastProps;
  day: number;
}

const DashboardProfile: React.FC<DashboardProfileProps> = ({ userCityData, cityListData, day }) => {
  const hourDiference: number =
    Number(userCityData.atualHour.split(" ")[1].split(":")[0]) - Number(cityListData.atualHour.split(" ")[1].split(":")[0]);
  const avgTempUserCity = Number(userCityData.cityWeather[day].day.maxtemp_c + userCityData.cityWeather[day].day.maxtemp_c) / 2;
  const avgTempCityList = Number(cityListData.cityWeather[day].day.maxtemp_c + cityListData.cityWeather[day].day.maxtemp_c) / 2;
  const temperatureDiference = Number(avgTempUserCity - avgTempCityList).toFixed(1);

  return (
    <>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Compared to {cityListData.name.split(",")[0]}</DashboardTitle>
        </DashboardHeader>
        <DashboardTable>
          <DashboardGridLeft>
          <DashboardHourBox>{userCityData.atualHour.split(" ")[1]}</DashboardHourBox>
            <DashboardIconBox>
              <img src={userCityData.cityWeather[day].day.condition.icon.split("/")[6]} />
            </DashboardIconBox>
            <DashboardTempMaxBox>{userCityData.cityWeather[day].day.maxtemp_c}º</DashboardTempMaxBox>
            <DashboardTempMinBox>{userCityData.cityWeather[day].day.mintemp_c}º</DashboardTempMinBox>
            <DashboardWindBox>
              <svg width="50px" height="50px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.4"
                  d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.7"
                  d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z"
                  fill="#1C274C"
                />
              </svg>
              {userCityData.cityWeather[day].day.maxwind_kph}km/h
            </DashboardWindBox>
          </DashboardGridLeft>

          <DashboardGridRight>
          <DashboardHourBox>{cityListData.atualHour.split(" ")[1]}</DashboardHourBox>
            <DashboardIconBox>
              <img src={cityListData.cityWeather[day].day.condition.icon.split("/")[6]} />
            </DashboardIconBox>
            <DashboardTempMaxBox>{cityListData.cityWeather[day].day.maxtemp_c}º</DashboardTempMaxBox>
            <DashboardTempMinBox>{cityListData.cityWeather[day].day.mintemp_c}º</DashboardTempMinBox>
            <DashboardWindBox>
              <svg width="50px" height="50px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.4"
                  d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.7"
                  d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z"
                  fill="#1C274C"
                />
              </svg>
              {cityListData.cityWeather[day].day.maxwind_kph}km/h
            </DashboardWindBox>
          </DashboardGridRight>
        </DashboardTable>
        <DashboardFooterText>{`Timezone diference : ${hourDiference > 0 ? "+" + hourDiference : hourDiference}h`}</DashboardFooterText>
        <DashboardFooterText>{`Average temp. diference: ${Number(temperatureDiference) > 0 ? "+" + temperatureDiference : temperatureDiference}ºC`}</DashboardFooterText>
      </DashboardContainer>
    </>
  );
};

export default DashboardProfile;
