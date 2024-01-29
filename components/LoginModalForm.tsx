import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import {
  FormCard,
  FormContainer,
  CloseButton,
  FormStyledTitleLogo,
  FormInput,
  LinkLabel,
  Link,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
  LogoContainerForm,
  FormProps,
} from "./RegisterModalForm";
import { useDispatch } from "react-redux";
import { closeModal, registerType } from "@/state/modal/modalSlice";
import { setUserName, setUserEmail, setIsLogged } from "@/state/user/userSlice";
import CloseIcon from "./icons/CloseFormIcon";
import LogoFormIcon from "./icons/LogoFormIcon";

const LoginForm: React.FC<FormProps> = ({ setErrorToDisplay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/login", { email, password });
      //store the token in the cookie(loginResponse.data.authToken)
      const userInfo = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
        headers: {
          Authorization: "Bearer " + loginResponse.data.authToken,
        },
      });

      //store token in the cookie
      setCookie("userToken", loginResponse.data.authToken, { sameSite: "none", secure: true });

      setErrorToDisplay({ errorMessage: `Welcome, ${userInfo.data.name}`, errorType: "success" });

      //store user info in redux state
      dispatch(setUserEmail(userInfo.data.email));
      dispatch(setUserName(userInfo.data.name));
      dispatch(setIsLogged());

      // dispatch(setList(userInfo.data.List))

      //push user to the profile page
      setTimeout(() => {
        router.push("/Profile");
        dispatch(closeModal());
      }, 2000);
    } catch (err: any) {
      console.log("error on login submit: ", err.response.data.message);
      setErrorToDisplay({ errorMessage: err.response.data.message, errorType: "error" });
    }
  };
  return (
    <>
      <FormCard data-testid="loginForm">
        <CloseButton data-testid="closeLoginModalBtn" onClick={() => dispatch(closeModal())}>
          <CloseIcon />
        </CloseButton>
        <LogoContainerForm>
          <LogoFormIcon />
          <FormStyledTitleLogo>WeatherWise</FormStyledTitleLogo>
        </LogoContainerForm>

        <FormContainer onSubmit={(e) => onLoginSubmit(e)}>
          <FormInput required autoComplete="on" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <FormInput required autoComplete="on" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

          <LinkLabel>Don't have an account?</LinkLabel>
          <Link data-testid="changeToRegisterLink" onClick={() => dispatch(registerType())}>SIGN UP</Link>

          <SubmitButton type="submit">LOGIN</SubmitButton>
        </FormContainer>
      </FormCard>
    </>
  );
};

export default LoginForm;
