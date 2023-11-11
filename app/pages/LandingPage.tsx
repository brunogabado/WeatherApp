
import styled from "styled-components";
import Header from "../components/Header";

const StyledTitle = styled.h1`
diplay: flex;
align-items: center;
  margin: 0;
`;

const LandingPage: React.FC = () => {
    return (
        <>
            <Header />
            <StyledTitle>developing the landing page</StyledTitle>
            <p>testando</p>
        </>
    );
};

export { LandingPage, StyledTitle };