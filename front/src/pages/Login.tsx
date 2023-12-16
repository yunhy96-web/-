import React from "react";
import * as Style from "../components/Login/styles";
import { useNavigate } from "react-router-dom";
import { Icon } from "../assets";
const Login = () => {
  const navigate = useNavigate();
  return (
    <Style.Container>
      <Style.Background></Style.Background>
      <Style.KakaoLoginButton
        onClick={() => {
          window.location.href =
            "http://localhost:8080/oauth2/authorization/kakao";
        }}
      >
        <Icon.KakaoButton />
      </Style.KakaoLoginButton>
    </Style.Container>
  );
};

export default Login;
