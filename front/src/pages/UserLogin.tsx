import React, { useEffect } from "react";
import * as Style from "../components/Login/styles";
import { ThreeDots } from "react-loader-spinner";
import { useRecoilState } from "recoil";
import { authState } from "../atom/authState";
import { useLocation, useSearchParams } from "react-router-dom";

const UserLogin = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  return (
    <Style.Container>
      <Style.Background></Style.Background>
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          height: "100%",
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
        <ThreeDots
          height="60"
          width="60"
          radius="9"
          color="#FF7A00"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          // wrapperClassName=""
          visible={true}
        />
        <Style.Login>로그인 중입니다.</Style.Login>
      </div>
    </Style.Container>
  );
};

export default UserLogin;
