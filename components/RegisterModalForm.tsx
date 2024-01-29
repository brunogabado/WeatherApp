import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { closeModal, loginType } from "@/state/modal/modalSlice";
import { setUserName, setUserEmail, setIsLogged } from "@/state/user/userSlice";
import { errorProps } from "./Modal";
import CloseIcon from "./icons/CloseFormIcon";
import LogoFormIcon from "./icons/LogoFormIcon";

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
`;
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
`;
export const FormInput = styled.input`
  display: flex;
  align-items: center;
  /* text-align: center; */
  height: 40px;
  width: 300px;
  background-color: #ececec;
  border: none;
  border-radius: 5px;
  margin: 8px 0;
  padding: 2px;

  &::placeholder {
    text-align: center;
  }
`;
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
  &:hover {
    transform: scale(1.2);
  }
`;
export const FormStyledTitleLogo = styled.h1`
  font-size: 24px;
  margin-top: 32px;
  display: flex;
  align-content: center;
  font-family: "Pacifico", cursive;
  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }
`;
export const LogoContainerForm = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 30px;
`;
export const LinkLabel = styled.p`
  margin: 15px 0 0 0;
`;
export const Link = styled.a`
  color: #57a7d1;
  font-weight: 600;
  margin-bottom: 15px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  border: none;
  background: none;
  padding: 0;
  align-self: end;
  margin: 20px;

  transition: 0.2s ease;
  &:hover {
    transform: scale(1.3);
  }
`;
export const ErrorMessage = styled.p`
  color: red;
`;
export const SuccessMessage = styled.p`
  color: green;
`;

export interface FormProps {
  setErrorToDisplay: (error: errorProps) => void;
}

const RegisterForm: React.FC<FormProps> = ({ setErrorToDisplay }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const onRegistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const registResponse = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/signup", { name, email, password });
      //store the token in the cookie(registResponse.data.authToken)
      const userInfo = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
        headers: {
          Authorization: "Bearer " + registResponse.data.authToken,
        },
      });

      //store token in the cookie
      setCookie("userToken", registResponse.data.authToken, { sameSite: "none", secure: true });
      setErrorToDisplay({ errorMessage: `Welcome, ${userInfo.data.name}`, errorType: "success" });

      //store user info in redux state
      dispatch(setUserEmail(userInfo.data.email));
      dispatch(setUserName(userInfo.data.name));
      dispatch(setIsLogged());
      //push user to the profile page

      setTimeout(() => {
        router.push("/Profile");
        dispatch(closeModal());
      }, 2000);
    } catch (err: any) {
      console.log("error on register submit: ", err.response.data.message);
      setErrorToDisplay({ errorMessage: err.response.data.message, errorType: "error" });
    }
  };

  return (
    <>
      <FormCard data-testid="registerForm">
        <CloseButton data-testid="closeRegisterModalBtn" onClick={() => dispatch(closeModal())}>
          <CloseIcon />
        </CloseButton>
        <LogoContainerForm>
          <LogoFormIcon />
          <FormStyledTitleLogo>WeatherWise</FormStyledTitleLogo>
        </LogoContainerForm>

        <FormContainer onSubmit={(event) => onRegistSubmit(event)}>
          <FormInput required autoComplete="on" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <FormInput required autoComplete="on" placeholder="username" onChange={(e) => setName(e.target.value)} />
          <FormInput required autoComplete="on" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

          <LinkLabel>Do you have an account?</LinkLabel>
          <Link data-testid="changeToLoginLink" onClick={() => dispatch(loginType())}>LOGIN</Link>

          <SubmitButton type="submit">REGISTER</SubmitButton>
        </FormContainer>
      </FormCard>
    </>
  );
};

export default RegisterForm;
