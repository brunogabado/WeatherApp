import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginType, openModal, closeModal } from "@/state/modal/modalSlice";
import { useRouter } from "next/router";
import { RootState } from "@/state/store";
import { clearUserState } from "@/state/user/userSlice";
import { deleteCookie } from "cookies-next";
import { setIsLogged } from "@/state/user/userSlice";
import LogoIcon from "./icons/LogoIcon";
import BurguerMenuIcon from "./icons/BurgerMenuIcon";
import CloseMenuIcon from "./icons/CloseMenuIcon";

const HeaderContainer = styled.div`
  display: flex;
  height: 90px;
  width: 100%;
  justify-content: space-between;
  background-color: #d8f2ff;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 5;
`;
const StyledTitleLogo = styled.h1`
  display: flex;
  align-content: center;
  margin-top: 40px;
  font-family: "Pacifico", cursive;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MobileNavbar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 12;
  flex-direction: column;
  background-color: white;
  padding: 30px 0;
  gap: 15px;
  height: 100%;
  margin-top: 90px;
  width: 100%;
`;
const NavbarLink = styled.button`
  font-size: 20px;
  align-self: center;
  width: 120px;
  height: 40px;
  border: none;
  background: none;
  transition: 0.2s ease;
  &:hover {
    color: #57a7d1;
    font-size: 22px;
    border-bottom: 1px solid #57a7d1;
  }

  @media (max-width: 715px) {
    display: none;
  }
`;
const MobileNavbarLink = styled.button`
  font-size: 20px;
  align-self: center;
  width: 120px;
  height: 40px;
  border: none;
  background: none;
  transition: 0.7s ease;
  &:hover {
    color: #57a7d1;
    font-size: 18px;
  }
`;
const BurgerMenu = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 50px;
  background: none;
  border: none;

  @media (min-width: 715px) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [extendNavbar, setExtendNavbar] = useState<boolean>(false);
  const router = useRouter();
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setExtendNavbar(false);
    dispatch(loginType());
    dispatch(openModal());
  };

  const handleLogoutClick = () => {
    dispatch(clearUserState());
    router.push("/");
    deleteCookie("userToken");
  };

  const handleMyProfileClick = () => {
    isLogged ? router.push("/Profile") : dispatch(openModal());
    setExtendNavbar(false);
  };

  const handleHomeClick = () => {
    if (extendNavbar) {
      setExtendNavbar(false);
    }
    router.push("/");
  };

  return (
    <>
      <HeaderContainer>
        <LogoContainer onClick={handleHomeClick}>
          <LogoIcon />
          <StyledTitleLogo>WeatherWise</StyledTitleLogo>
        </LogoContainer>

        <Navbar>
          <NavbarLink onClick={() => router.push("/")}>Home</NavbarLink>
          <NavbarLink onClick={handleMyProfileClick}>My Profile</NavbarLink>
          {isLogged ? <NavbarLink onClick={handleLogoutClick}>Logout</NavbarLink> : <NavbarLink onClick={handleLoginClick}>Login</NavbarLink>}
          <BurgerMenu
            onClick={() => {
              setExtendNavbar((curr) => !curr);
            }}
          >
            {extendNavbar ? <BurguerMenuIcon /> : <CloseMenuIcon />}
          </BurgerMenu>
        </Navbar>
      </HeaderContainer>

      {extendNavbar && (
        <MobileNavbar>
          <MobileNavbarLink onClick={handleHomeClick}>Home</MobileNavbarLink>
          <MobileNavbarLink onClick={handleMyProfileClick}>My Profile</MobileNavbarLink>
          {isLogged ? (
            <MobileNavbarLink onClick={handleLogoutClick}>Logout</MobileNavbarLink>
          ) : (
            <MobileNavbarLink onClick={handleLoginClick}>Login</MobileNavbarLink>
          )}
        </MobileNavbar>
      )}
    </>
  );
};

export default Header;
