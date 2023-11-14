"use client"

import styled from "styled-components";
import { LandingPage } from "./pages/LandingPage";



const StyledContainer = styled.div`
margin: 2%;
border-radius:30px;
box-shadow: 25px 0 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45);
background: linear-gradient(to bottom, #57a7d1 0%, #F0F8FF 100%);`

export default function Home() {
  return (
    <StyledContainer>
      <LandingPage />
    </StyledContainer>
  )
}
