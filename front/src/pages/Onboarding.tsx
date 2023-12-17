import React from "react";
import * as Style from "../components/Onboarding/styles";
import { useNavigate } from "react-router-dom";
const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <Style.Container>
      <Style.Background></Style.Background>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: 63,
          display: "flex",
          flexDirection: "column",
          left: 45,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/intro.png"
          alt=""
          style={{ width: 260, height: 343 }}
        />
      </div>
      <Style.StartButton onClick={() => navigate("login")}>
        시작하기
      </Style.StartButton>
    </Style.Container>
  );
};

export default Onboarding;
