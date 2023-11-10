"use client"

import styled from "styled-components";
import LandingPage from "./pages/LandingPage";


const StyledContainer = styled.div`
background-color: red;`

export default function Home() {
  return (
      <StyledContainer>
        <LandingPage />
      </StyledContainer>
  )
}
