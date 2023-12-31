import React, { useState } from 'react';
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { closeModal, loginType } from '@/state/modal/modalSlice';
import { setUserName, setUserEmail, setIsLogged } from '@/state/user/userSlice';
import { errorProps } from './Modal';


export const FormCard = styled.div`
display: flex;
width: 350px;
flex-direction: column;
align-items: center;
border: none;
background-color: white;
gap: 20px;

@media (max-width: 400px) {
    width: 300px;
}

`
export const FormContainer = styled.form`
    display: flex;
width: 350px;
flex-direction: column;
align-items: center;
border: none;
background-color: white;
gap: 20px;

@media (max-width: 400px) {
    width: 300px;
}
`
export const FormInput = styled.input`
display: flex;
align-items: center;
text-align: center;
height: 40px;
width: 300px;
background-color: #ececec;
border: none;
border-radius: 5px;
margin: 8px 0;
padding: 2px;
`
export const SubmitButton = styled.button`
color: white;
height: 50px;
width: 100%;
align-self: end;
border: none;
background-color: #57a7d1;
background-size: cover;
padding: 0;
font-size: 22px;
font-weight: 600;
transition: 0.2s ease;
&:hover{
    transform: scale(1.2);
}
`
export const FormStyledTitleLogo = styled.h1`
font-size: 24px;
margin-top: 32px;
display: flex;
align-content: center;
@media only screen and (max-width: 600px){
	font-size: 16px
}
`
export const LogoContainerForm = styled.div`
display: flex;
font-family: 'Bebas Neue', sans - serif;
align-items: center;
cursor: pointer;
margin-top: 30px;
`
export const LinkLabel = styled.p`

margin: 15px 0 0 0;
`
export const Link = styled.a`
color: #57a7d1;
font-weight: 600;
margin-bottom: 15px;
cursor: pointer;
transition: 0.2s ease;
&:hover{
    transform: scale(1.2);
}
`
export const CloseButton = styled.button`
position: absolute;
border: none;
background: none;
padding: 0;
align-self: end;
margin: 20px;

transition: 0.2s ease;
&:hover{
    transform: scale(1.3);
}
`
export const ErrorMessage = styled.p`
color: red;
`
export const SuccessMessage = styled.p`
color: green;
`

export interface FormProps {
    setErrorToDisplay: (error: errorProps) => void;
}

const RegisterForm: React.FC<FormProps> = ({ setErrorToDisplay }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const router = useRouter()

    const onRegistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const registResponse = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/signup", { name, email, password })
            //store the token in the cookie(registResponse.data.authToken)
            const userInfo = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
                headers: {
                    Authorization: "Bearer " + registResponse.data.authToken
                }
            })

            //store token in the cookie
            setCookie('userToken', registResponse.data.authToken, { sameSite: 'none', secure: true });
            setErrorToDisplay({ errorMessage: `Welcome, ${userInfo.data.name}`, errorType: "success" })

            //store user info in redux state
            dispatch(setUserEmail(userInfo.data.email));
            dispatch(setUserName(userInfo.data.name));
            dispatch(setIsLogged())
            //push user to the profile page

            setTimeout(() => {
                router.push('/Profile');
                dispatch(closeModal())
            }, 2000)
        } catch (err: any) {
            console.log("error on regist submit: ", err.response.data.message)
            setErrorToDisplay({ errorMessage: err.response.data.message, errorType: "error" })
        }
    }


    return (
        <>
            <FormCard >
                <CloseButton onClick={() => dispatch(closeModal())}>
                    <svg width="20px" height="20px" viewBox="0 -0.5 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>close_mini [#1522]</title>
                        <desc>Created with Sketch.</desc>
                        <defs>

                        </defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -206.000000)" fill="#000000">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <polygon id="close_mini-[#1522]" points="334.6 49.5 337 51.6 335.4 53 333 50.9 330.6 53 329 51.6 331.4 49.5 329 47.4 330.6 46 333 48.1 335.4 46 337 47.4">

                                    </polygon>
                                </g>
                            </g>
                        </g>
                    </svg></CloseButton>
                <LogoContainerForm>
                    <svg width="60px" height="60px" viewBox="0 0 900 900"
                        version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M621.7 451.6m-129.5 0a129.5 129.5 0 1 0 259 0 129.5 129.5 0 1 0-259 0Z" fill="#F4CE26" />
                        <path d="M621.7 607.4c-85.9 0-155.8-69.9-155.8-155.8s69.9-155.8 155.8-155.8 155.8 69.9 155.8 155.8S707.6 607.4 621.7 607.4z m0-258.9c-56.8 0-103.1 46.2-103.1 103.1s46.3 103.1 103.1 103.1 103-46.3 103-103.2-46.2-103-103-103z" fill="#333333" /><path d="M502.1 198c11.8-6.8 26.9-2.8 33.7 9l24.7 42.7c6.8 11.8 2.8 26.9-9 33.7-11.8 6.8-26.9 2.8-33.7-9l-24.7-42.7c-6.9-11.9-2.8-26.9 9-33.7zM807.8 406.4c3.5 13.2 17 21 30.2 17.4l47.6-12.8c13.2-3.5 21-17 17.4-30.2-3.5-13.2-17-21-30.2-17.4l-47.6 12.8c-13.1 3.5-20.9 17-17.4 30.2zM794.6 517.3c-3.5 13.2 4.3 26.7 17.4 30.2l47.6 12.8c13.2 3.5 26.7-4.3 30.2-17.4 3.5-13.2-4.3-26.7-17.4-30.2l-47.6-12.8c-13.1-3.5-26.6 4.3-30.2 17.4zM665.7 161.8c13.6 0 24.7 11 24.7 24.7v49.3c0 13.6-11 24.7-24.7 24.7-13.6 0-24.7-11-24.7-24.7v-49.3c0-13.6 11-24.7 24.7-24.7zM832.8 231.3c-9.6-9.6-25.2-9.6-34.9 0L763 266.2c-9.6 9.6-9.6 25.2 0 34.9 9.6 9.6 25.2 9.6 34.9 0l34.9-34.9c9.7-9.7 9.7-25.3 0-34.9z" fill="#333333" /><path d="M264.5 740.8c-2.2 0.2-4.3 0.4-6.5 0.5-60.5 3.4-111-49.7-111-111s49.7-111 111-111c4.2 0 8.4 0.2 12.5 0.7-0.1-2.3-0.1-4.6-0.1-6.9 0-85.1 69-154.1 154.1-154.1 75.2 0 137.8 53.8 151.4 125 6.9-1.1 14-1.7 21.2-1.7 71.5 0 129.5 58 129.5 129.5-0.2 45.7-23.8 85.9-59.6 108.9-20.2 13-44.2 21.3-70 20.5-3.5-0.1-6.9-0.3-10.3-0.7-1.1 0.1-2.3 0.1-3.4 0.1H264.5z" fill="#D8F2FF" /><path d="M252.4 767.8c-32.4 0-63.3-12.5-87.9-35.8-27.9-26.4-43.9-63.5-43.9-101.7 0-71.3 54.7-130.2 124.3-136.7 9.8-90.3 86.5-160.9 179.4-160.9 78.4 0 147 50.6 171.2 123.3h1.4c86 0 155.9 69.9 155.9 155.8 0 53.3-26.7 102.3-71.5 131.1-26.5 17.1-56.1 25.6-85.1 24.7-3.4-0.1-6.7-0.3-10-0.6-1 0-2 0.1-3 0.1H265.8c-2.1 0.2-4.2 0.4-6.3 0.5-2.4 0.1-4.7 0.2-7.1 0.2z m5.5-222.1c-46.6 0-84.6 38-84.6 84.6 0 23.8 10 46.9 27.4 63.4 15.7 14.9 35.7 22.5 55.7 21.2 1.7-0.1 3.5-0.2 5.2-0.4l2.8-0.2h324.9c2.8 0.3 5.6 0.5 8.4 0.6 23.2 0.8 42.8-8.5 54.9-16.4 29.8-19 47.5-51.4 47.5-86.7 0-56.8-46.3-103.1-103.1-103.1-5.7 0-11.4 0.5-16.9 1.4l-25.4 4.2-4.8-25.3c-11.5-60-64.2-103.6-125.5-103.6-70.5 0-127.8 57.3-127.8 127.8 0 1.9 0 3.8 0.1 5.7l1.4 30.9-30.7-3.5c-3.1-0.4-6.2-0.6-9.5-0.6z" fill="#333333" />
                    </svg>
                    <FormStyledTitleLogo>WeatherWise</FormStyledTitleLogo>
                </LogoContainerForm>

                <FormContainer onSubmit={(event) => onRegistSubmit(event)}>
                    <FormInput required autoComplete="on" type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    <FormInput required autoComplete='on' placeholder='username' onChange={(e) => setName(e.target.value)} />
                    <FormInput required autoComplete="on" type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />

                    <LinkLabel>Do you have an account?</LinkLabel>
                    <Link onClick={() => dispatch(loginType())}>LOGIN</Link>

                    <SubmitButton type='submit'>REGIST</SubmitButton>
                </FormContainer>
            </FormCard >
        </>
    )
}

export default RegisterForm