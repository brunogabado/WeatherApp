import { filteredForecastProps } from "@/pages/Profile";
import styled from "styled-components";
import WindIcon from "./icons/WindIcon";

export const DashboardContainer = styled.div`
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
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid white;

  @media (max-width: 450px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
  }
`;
export const DashboardHeader = styled.div`
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
export const DashboardTitle = styled.h3`
  display: flex;
  min-width: 50%;
  margin: 0;
  padding: 20px 0;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const DashboardIconBox = styled.div`
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
export const DashboardTable = styled.div`
  display: flex;
`;
export const DashboardTempMaxBox = styled.div`
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
export const DashboardTempMinBox = styled(DashboardTempMaxBox)`
  background-color: #a6f6ff;
`;
export const DashboardWindBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 5px 15px 5px;
  font-size: 20px;
`;
export const DashboardHourBox = styled.div`
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
      <DashboardContainer data-testid="comparisonDashboard">
        <DashboardHeader>
          <DashboardTitle data-testid="comparisonDashboardTitle">{cityListData.name.split(",")[0]}</DashboardTitle>
        </DashboardHeader>
        <DashboardTable>
          <DashboardGrid>
            <DashboardHourBox data-testid="comparisonDashboardParam">{cityListData.atualHour.split(" ")[1]}</DashboardHourBox>
            <DashboardIconBox data-testid="comparisonDashboardParam">
              <img src={cityListData.cityWeather[day].day.condition.icon.split("/")[6]} />
            </DashboardIconBox>
            <DashboardTempMaxBox data-testid="comparisonDashboardParam">{cityListData.cityWeather[day].day.maxtemp_c}º</DashboardTempMaxBox>
            <DashboardTempMinBox data-testid="comparisonDashboardParam">{cityListData.cityWeather[day].day.mintemp_c}º</DashboardTempMinBox>
            <DashboardWindBox data-testid="comparisonDashboardParam">
              <WindIcon />
              {cityListData.cityWeather[day].day.maxwind_kph}km/h
            </DashboardWindBox>
          </DashboardGrid>
        </DashboardTable>
        <DashboardFooterText>{`Timezone diference : ${hourDiference > 0 ? "+" + hourDiference : hourDiference}h`}</DashboardFooterText>
        <DashboardFooterText>{`Average temp. diference: ${
          Number(temperatureDiference) > 0 ? "+" + temperatureDiference : temperatureDiference
        }ºC`}</DashboardFooterText>
      </DashboardContainer>
    </>
  );
};

export default DashboardProfile;
