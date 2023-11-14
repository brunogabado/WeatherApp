
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StyledTitle = styled.h1`
diplay: flex;
align-items: center;
  margin: 0;
`;
const MainContent = styled.div`
display:flex;
align-items: center;
justify-content: space-around;
border-bottom: 1px solid blue;
padding: 7% 0 7% 0;
`
const VideoContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
justify-items: center;
width: 40%;
overflow: hidden;
border-radius: 7%;
box-shadow: 25px 0 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45);

@media (max-width: 1000px){
    grid-template-columns: 1fr;
    width: 25%;
    border-radius: 10px;
    box-shadow: none;
    }

    @media (max-width: 600px){
        display: none;
    }
`
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
font-size: 160%;
width: 40%;
height: 80%;
justify-items: center;


@media (max-width: 900px){
    font-size: 140%;
}

@media (max-width: 700px){
    gap: 20px;
    font-size: 110%;
}

@media (max-width: 600px){
    gap: 20px;
    font-size: 90%;
    width: 70%;
}
`
const ButtonContainer = styled.div`
display: flex;
height: auto;
justify-content: center;
`
const DashboardContainer = styled.div`
width: 100%;
height: 80%;
background-color: #57a7d1;
`
const Video = styled.video`
max-width: 100%;
object-fit: contain;
`
const ButtonLog = styled.button`
font-size: 75%;
color: black;
height: 50px;
width: 220px;
background: #57a7d1;
border-radius: 10px;
margin: 5px;

transition: 0.7s ease;

&:hover {
    border: 1px solid white;
    color: white;
    font-size: 85%;
}

@media (max-width: 1220px){
    height: 40px;
    width: 170px;
}`

const LandingPage: React.FC = () => {
    return (
        <>
            <Header />
            <MainContent>
                <VideoContainer>
                    <Video loop autoPlay muted>
                        <source src="\sun.mp4" type="video/mp4" />
                    </Video>
                    <Video loop autoPlay muted>
                        <source src="\rain.mp4" type="video/mp4" />
                    </Video>
                    <Video loop autoPlay muted>
                        <source src="\arcoiris.mp4" type="video/mp4" />
                    </Video>
                    <Video loop autoPlay muted>
                        <source src="\trovao.mp4" type="video/mp4" />
                    </Video>
                </VideoContainer>
                <InfoContainer>
                    <StyledTitle>Don't let unexpected weather disrupt your plans. Plan your life wisely with WeatherWise !</StyledTitle>
                    <p>Create a list of cities, then easily compare them to your current location by logging in.</p>
                    <ButtonContainer>
                        <ButtonLog>Login</ButtonLog>
                        <ButtonLog>Register</ButtonLog>
                    </ButtonContainer>

                </InfoContainer>
            </MainContent>
            <DashboardContainer>

            </DashboardContainer>
            <Footer />
        </>
    );
};

export { LandingPage, StyledTitle };


