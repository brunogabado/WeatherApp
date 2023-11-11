"use client"

import styled from "styled-components";
import { LandingPage } from "./pages/LandingPage";



const StyledContainer = styled.div`

background-color: rgb(252, 236, 221);
height: 100%;`

export default function Home() {
  return (
    <StyledContainer>
      <LandingPage />
    </StyledContainer>
  )
}
