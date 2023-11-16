
import styled from "styled-components";


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
img{
    padding: 15px;
    border-right:1px solid black;
    border-left:1px solid black;
    margin: 0;
    width: 65px
}

`

export interface dashboardProps {
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


const Dashboard: React.FC<dashboardProps> = ({ temperaturesArr, iconsArr, dashboardData }: dashboardProps) => {

    const hoursArray: string[] = ["00:00h", "03:00h", "06:00h", "09:00h", "12:00h", "15:00h", "18:00h", "21:00h"]
    const numOfTemps: number = temperaturesArr.length
    return (
        <DashboardContainer>
            <DashboardHeader>
                <WeatherMaxMinSection>
                    <MaxTempSection>
                        <p>22ª</p>
                    </MaxTempSection>
                    <MinTempSection>
                        <p>15º</p>
                    </MinTempSection>
                    <MaxWindSection>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z" fill="#1C274C" />
                            <path opacity="0.4" d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C" />
                            <path opacity="0.7" d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z" fill="#1C274C" />
                        </svg>
                        <p>{dashboardData.wind} klm/h</p>
                    </MaxWindSection>
                </WeatherMaxMinSection>
                <DateSection>{dashboardData.date}</DateSection>
                <CitySection>{dashboardData.cityName}</CitySection>
            </DashboardHeader>
            <DashboardGrid>
                <HoursRow>{hoursArray.slice(-Math.abs(numOfTemps)).map((hour, index) => (<p key={index}>{hour}</p>))}</HoursRow>
                <IconsRow>{iconsArr.map((icon, index) => (<img key={index} src={"https://openweathermap.org/img/wn/" + icon + ".png"} />))}</IconsRow>
                <TemperaturesRow>{temperaturesArr.map((temp, index) => (<p key={index}>{temp.toFixed(0)}º</p>))}</TemperaturesRow>
            </DashboardGrid>
        </DashboardContainer>
    )
}

export default Dashboard