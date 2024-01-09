import styled from "styled-components";
import MailIcon from "./icons/MailIcon";
import GithubIcon from "./icons/GithubIcon";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: auto;
  height: 70px;
  margin: 0 20px 0 20px;
  gap: 10px;
`;
const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  align-items: center;
  justify-content: space-around;
`;
const FooterDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
`;
const FooterDescription = styled.p`
  text-align: center;
  margin: 0;
  padding: 5px;
`;

const Footer: React.FC = () => {
  return (
    <>
      <FooterContainer>
        <IconsContainer>
          <a href="mailto:brunogabado@hotmail.com">
            <MailIcon />
          </a>

          <a href="https://github.com/brunogabado">
            <GithubIcon />
          </a>
        </IconsContainer>

        <FooterDescriptionContainer>
          <FooterDescription>WeatherWise© 2023</FooterDescription>
        </FooterDescriptionContainer>
      </FooterContainer>
    </>
  );
};

export default Footer;
