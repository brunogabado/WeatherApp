import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import { loginType, openModal, closeModal } from '@/state/modal/modalSlice';
import { useRouter } from 'next/router';
import { RootState } from '@/state/store';
import { clearUserState } from '@/state/user/userSlice';
import { deleteCookie } from 'cookies-next';
import { setIsLogged } from '@/state/user/userSlice';

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

`
const StyledTitleLogo = styled.h1`
display: flex;
align-content: center;
margin-top: 40px;
font-family: 'Pacifico', cursive;
@media only screen and (max-width: 600px){
	font-size: 18px
}

`
const LogoContainer = styled.div`
display: flex;
align-items: center;
cursor: pointer;
`
const Navbar = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
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
`
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
};

@media(max-width: 715px){
    display:none
    
    }
`
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
};

`
const BurgerMenu = styled.button`
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
height: 50px;
background: none;
border: none;

@media(min-width: 715px) {
    display: none

}
`

const Header: React.FC = () => {

    const [extendNavbar, setExtendNavbar] = useState<boolean>(false)
    const router = useRouter()
    const isLogged = useSelector((state: RootState) => state.user.isLogged)
    const dispatch = useDispatch()


    const handleLoginClick = () => {
        setExtendNavbar(false)
        dispatch(loginType())
        dispatch(openModal())
    }

    const handleLogoutClick = () => {
        dispatch(clearUserState())
        router.push("/")
        deleteCookie('userToken');
    }

    const handleMyProfileClick = () => {
        isLogged ? router.push("/Profile") : dispatch(openModal())
        setExtendNavbar(false)
    }

    const handleHomeClick = () => {
        if (extendNavbar) {
            setExtendNavbar(false)
        }
        router.push("/")
    }

    return (
        <>
            <HeaderContainer>

                <LogoContainer onClick={handleHomeClick}>
                    <svg width="90px" height="90px" viewBox="0 0 800 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M621.7 451.6m-129.5 0a129.5 129.5 0 1 0 259 0 129.5 129.5 0 1 0-259 0Z" fill="#F4CE26" />
                        <path d="M621.7 607.4c-85.9 0-155.8-69.9-155.8-155.8s69.9-155.8 155.8-155.8 155.8 69.9 155.8 155.8S707.6 607.4 621.7 607.4z m0-258.9c-56.8 0-103.1 46.2-103.1 103.1s46.3 103.1 103.1 103.1 103-46.3 103-103.2-46.2-103-103-103z" fill="#333333" /><path d="M502.1 198c11.8-6.8 26.9-2.8 33.7 9l24.7 42.7c6.8 11.8 2.8 26.9-9 33.7-11.8 6.8-26.9 2.8-33.7-9l-24.7-42.7c-6.9-11.9-2.8-26.9 9-33.7zM807.8 406.4c3.5 13.2 17 21 30.2 17.4l47.6-12.8c13.2-3.5 21-17 17.4-30.2-3.5-13.2-17-21-30.2-17.4l-47.6 12.8c-13.1 3.5-20.9 17-17.4 30.2zM794.6 517.3c-3.5 13.2 4.3 26.7 17.4 30.2l47.6 12.8c13.2 3.5 26.7-4.3 30.2-17.4 3.5-13.2-4.3-26.7-17.4-30.2l-47.6-12.8c-13.1-3.5-26.6 4.3-30.2 17.4zM665.7 161.8c13.6 0 24.7 11 24.7 24.7v49.3c0 13.6-11 24.7-24.7 24.7-13.6 0-24.7-11-24.7-24.7v-49.3c0-13.6 11-24.7 24.7-24.7zM832.8 231.3c-9.6-9.6-25.2-9.6-34.9 0L763 266.2c-9.6 9.6-9.6 25.2 0 34.9 9.6 9.6 25.2 9.6 34.9 0l34.9-34.9c9.7-9.7 9.7-25.3 0-34.9z" fill="#333333" /><path d="M264.5 740.8c-2.2 0.2-4.3 0.4-6.5 0.5-60.5 3.4-111-49.7-111-111s49.7-111 111-111c4.2 0 8.4 0.2 12.5 0.7-0.1-2.3-0.1-4.6-0.1-6.9 0-85.1 69-154.1 154.1-154.1 75.2 0 137.8 53.8 151.4 125 6.9-1.1 14-1.7 21.2-1.7 71.5 0 129.5 58 129.5 129.5-0.2 45.7-23.8 85.9-59.6 108.9-20.2 13-44.2 21.3-70 20.5-3.5-0.1-6.9-0.3-10.3-0.7-1.1 0.1-2.3 0.1-3.4 0.1H264.5z" fill="#D8F2FF" /><path d="M252.4 767.8c-32.4 0-63.3-12.5-87.9-35.8-27.9-26.4-43.9-63.5-43.9-101.7 0-71.3 54.7-130.2 124.3-136.7 9.8-90.3 86.5-160.9 179.4-160.9 78.4 0 147 50.6 171.2 123.3h1.4c86 0 155.9 69.9 155.9 155.8 0 53.3-26.7 102.3-71.5 131.1-26.5 17.1-56.1 25.6-85.1 24.7-3.4-0.1-6.7-0.3-10-0.6-1 0-2 0.1-3 0.1H265.8c-2.1 0.2-4.2 0.4-6.3 0.5-2.4 0.1-4.7 0.2-7.1 0.2z m5.5-222.1c-46.6 0-84.6 38-84.6 84.6 0 23.8 10 46.9 27.4 63.4 15.7 14.9 35.7 22.5 55.7 21.2 1.7-0.1 3.5-0.2 5.2-0.4l2.8-0.2h324.9c2.8 0.3 5.6 0.5 8.4 0.6 23.2 0.8 42.8-8.5 54.9-16.4 29.8-19 47.5-51.4 47.5-86.7 0-56.8-46.3-103.1-103.1-103.1-5.7 0-11.4 0.5-16.9 1.4l-25.4 4.2-4.8-25.3c-11.5-60-64.2-103.6-125.5-103.6-70.5 0-127.8 57.3-127.8 127.8 0 1.9 0 3.8 0.1 5.7l1.4 30.9-30.7-3.5c-3.1-0.4-6.2-0.6-9.5-0.6z" fill="#333333" />
                    </svg>
                    <StyledTitleLogo>WeatherWise</StyledTitleLogo>
                </LogoContainer>

                <Navbar>
                    <NavbarLink onClick={() => router.push("/")}>Home</NavbarLink>
                    <NavbarLink onClick={handleMyProfileClick}>My Profile</NavbarLink>
                    {isLogged ? <NavbarLink onClick={handleLogoutClick}>Logout</NavbarLink> : <NavbarLink onClick={handleLoginClick}>Login</NavbarLink>}
                    <BurgerMenu onClick={() => { setExtendNavbar((curr) => !curr) }}>
                        {extendNavbar ? <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F" />
                        </svg> : <svg fill="#000000" height="60%" width="60%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 297.001 297.001">
                            <g>
                                <g>
                                    <g>
                                        <path d="M273.736,0.001H23.264C10.436,0.001,0,10.436,0,23.264v23.789C0,59.88,10.436,70.316,23.264,70.316h250.473
				c12.827,0,23.264-10.435,23.264-23.263V23.264C297,10.436,286.564,0.001,273.736,0.001z"/>
                                        <path d="M273.736,113.344H23.264C10.436,113.344,0,123.779,0,136.605v23.789c0,12.827,10.436,23.263,23.264,23.263h250.473
				c12.827,0,23.264-10.435,23.264-23.263v-23.789C297,123.779,286.564,113.344,273.736,113.344z"/>
                                        <path d="M273.736,226.686H23.264C10.436,226.686,0,237.121,0,249.949v23.789C0,286.565,10.436,297,23.264,297h250.473
				C286.564,297,297,286.565,297,273.737v-23.789C297,237.121,286.564,226.686,273.736,226.686z"/>
                                    </g>
                                </g>
                            </g>
                        </svg>}
                    </BurgerMenu>
                </Navbar>
            </HeaderContainer>

            {extendNavbar &&
                <MobileNavbar >
                    <MobileNavbarLink onClick={handleHomeClick}>Home</MobileNavbarLink>
                    <MobileNavbarLink onClick={handleMyProfileClick}>My Profile</MobileNavbarLink>
                    {isLogged ? <MobileNavbarLink onClick={handleLogoutClick}>Logout</MobileNavbarLink> : <MobileNavbarLink onClick={handleLoginClick}>Login</MobileNavbarLink>}
                </MobileNavbar>
            }
        </>
    )
}

export default Header