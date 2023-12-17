import React from "react";
import * as Style from "../components/Login/styles";
import { useNavigate } from "react-router-dom";
import { Icon } from "../assets";
const Login = () => {
  const navigate = useNavigate();
  return (
    <Style.Container>
      <Style.Background></Style.Background>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: 250,
          // height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/logo.png"
          alt=""
          style={{ width: 185, height: 185 }}
        />
        <Style.Title>나만을 위한 AI 여행 플래너</Style.Title>
      </div>
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
