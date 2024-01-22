import styled from "styled-components";
import {
  DashboardContainer,
  DashboardGrid,
  DashboardHeader,
  DashboardHourBox,
  DashboardIconBox,
  DashboardTable,
  DashboardTempMaxBox,
  DashboardTempMinBox,
  DashboardTitle,
  DashboardWindBox,
} from "./DashboardProfile";
import WindIcon from "./icons/WindIcon";
import { filteredForecastProps } from "@/pages/Profile";

interface DashboardProfileProps {
  userCityData: filteredForecastProps;
  day: number;
}

const UserDashboardGrid = styled(DashboardGrid)`
  border: none;

  @media (max-width: 450px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
  }
`;

const DashBoardUserCity: React.FC<DashboardProfileProps> = ({ userCityData, day }) => {
  return (
    <DashboardContainer data-testid="userCityDashboard">
      <DashboardHeader>
        <DashboardTitle data-testid="dashboardTitle">Your city, {userCityData.name.split(",")[0]}</DashboardTitle>
      </DashboardHeader>
      <DashboardTable>
        <UserDashboardGrid>
          <DashboardHourBox data-testid="dashboardParam">{userCityData.atualHour.split(" ")[1]}</DashboardHourBox>
          <DashboardIconBox data-testid="dashboardParam">
            <img src={userCityData.cityWeather[day].day.condition.icon.split("/")[6]} />
          </DashboardIconBox>
          <DashboardTempMaxBox data-testid="dashboardParam">{userCityData.cityWeather[day].day.maxtemp_c}º</DashboardTempMaxBox>
          <DashboardTempMinBox data-testid="dashboardParam">{userCityData.cityWeather[day].day.mintemp_c}º</DashboardTempMinBox>
          <DashboardWindBox data-testid="dashboardParam">
            <WindIcon />
            {userCityData.cityWeather[day].day.maxwind_kph}km/h
          </DashboardWindBox>
        </UserDashboardGrid>
      </DashboardTable>
    </DashboardContainer>
  );
};

export default DashBoardUserCity;
