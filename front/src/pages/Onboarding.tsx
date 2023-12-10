import React from "react";
import * as Style from "../components/Onboarding/styles";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <Style.Container>
      <Style.Background></Style.Background>
      <Style.StartButton onClick={() => navigate("login")}>
        시작하기
      </Style.StartButton>
    </Style.Container>
  );
};

export default Onboarding;
