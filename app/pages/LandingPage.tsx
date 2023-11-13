
import styled from "styled-components";
import Header from "../components/Header";

const StyledTitle = styled.h1`
diplay: flex;
align-items: center;
  margin: 0;
`;

const MainContent = styled.div`
display:grid;
grid-template-columns: 1fr 1fr;
align-items: center;
justify-items: center;
height: 90%;
width: 100%`

const VideoContainer = styled.div`
width: 80%;
height: 70%;
object-fit: fill;
overflow: hidden;
border-radius: 7%;
box-shadow: 25px 0 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45);
`

const InfoContainer = styled.div`
font-size: 170%;
width: 80%;
height: 80%;
`

const DashboardContainer = styled.div`
`

const Video = styled.video`
max-width: 100%;
object-fit: cover;
`

const ButtonLog = styled.button`
font-size: 22px;
color: #F4CE14;
height: 60px;
width: 250px;
background: #57a7d1;
border-radius: 10px;
margin: 5px`

const LandingPage: React.FC = () => {
    return (
        <>
            <Header />
            <MainContent>
                <VideoContainer>
                    <Video loop autoPlay muted>
                        <source src="\original-c837b284d8b5db0315b76bca502a3b08.mp4" type="video/mp4" />
                    </Video>
                </VideoContainer>
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location by logging in.</p>
                    <ButtonLog>Login</ButtonLog>
                    <ButtonLog>Regsiter</ButtonLog>
                </InfoContainer>
            </MainContent>
            <DashboardContainer>

            </DashboardContainer>

        </>
    );
};

export { LandingPage, StyledTitle };


