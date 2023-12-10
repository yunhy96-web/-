import React from "react";
import * as Style from "../components/Login/styles";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <Style.Container>
      <Style.Background></Style.Background>
      <Style.KakaoLoginButton onClick={() => navigate("/home")}>
        카카오 간편 로그인
      </Style.KakaoLoginButton>
    </Style.Container>
  );
};

export default Login;
