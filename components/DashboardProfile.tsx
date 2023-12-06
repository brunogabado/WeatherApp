import styled from "styled-components"

const DashboardContainer = styled.div`
width: 300px;
background: linear-gradient(180deg, rgba(87,167,209,1) 1%, rgba(255,255,255,1) 200%);
border: 2px solid white;
border-radius: 30px;
padding: 20px;
`

const DashboardGrid = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    width: 50%;
    justify-content: center;
    align-items: center;
    justify-items: center;
`

const DashboardHeader = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
color: white;
align-items: center;
justify-content: center;
border-bottom: 1px solid white;
`

const DashboardTitle = styled.h4`
display: flex;
font-size: 26px;
align-items: center;
justify-content: center;
`

const DashboardIconBox = styled.div`
display: flex;
justify-content: center;

svg {
    height: 90px;
    text-align: center;
    padding: 5px;
    margin: 0;
  }


  @media (max-width: 800px) {
    flex-direction: column;
    svg {
        border: solid  black;
        border-width: 1px 0;
        width: auto;
      }
   }
`;

const DashboardTable = styled.div`
    display: flex;
`

const DashboardTempMaxBox = styled.div`
display: flex;
color: black;
justify-content: center;
background-color: #FF9B50;
align-items: center;
font-size: 20px;
width: 70px;
height: 70px;
border-radius: 50%;
`

const DashboardTempMinBox = styled(DashboardTempMaxBox)`
background-color: #A6F6FF;
`

const DashboardWindBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 5px;
font-size: 20px;
`
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
`

const DashboardProfile: React.FC = () => {
    return (
        <>
            <DashboardContainer>
                <DashboardHeader>
                    <DashboardTitle>Lamarosa</DashboardTitle>
                    <DashboardTitle>Lisboa</DashboardTitle>
                </DashboardHeader>
                <DashboardTable>

                    <DashboardGrid>
                        <DashboardHourBox>20:42h</DashboardHourBox>
                        <DashboardIconBox>
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
                            </svg>
                        </DashboardIconBox>
                        <DashboardTempMaxBox>23º</DashboardTempMaxBox>
                        <DashboardTempMinBox>17º</DashboardTempMinBox>
                        <DashboardWindBox>
                            <svg width="50px" height="50px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z" fill="#1C274C" />
                                <path opacity="0.4" d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C" />
                                <path opacity="0.7" d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z" fill="#1C274C" />
                            </svg>2km/h
                        </DashboardWindBox>
                    </DashboardGrid>


                    <DashboardGrid>
                        <DashboardHourBox>20:42h</DashboardHourBox>
                        <DashboardIconBox>
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
                            </svg>
                        </DashboardIconBox>
                        <DashboardTempMaxBox>23º</DashboardTempMaxBox>
                        <DashboardTempMinBox>17º</DashboardTempMinBox>
                        <DashboardWindBox>
                            <svg width="50px" height="50px" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5Z" fill="#1C274C" />
                                <path opacity="0.4" d="M3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#1C274C" />
                                <path opacity="0.7" d="M14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5Z" fill="#1C274C" />
                            </svg>2km/h
                        </DashboardWindBox>
                    </DashboardGrid>


                </DashboardTable>

            </DashboardContainer>
        </>
    )
}

export default DashboardProfile