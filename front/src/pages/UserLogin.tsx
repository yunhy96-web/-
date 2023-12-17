import React, { useEffect, useRef } from "react";
import * as Style from "../components/Login/styles";
import { ThreeDots } from "react-loader-spinner";
import { useRecoilState } from "recoil";
import { authState } from "../atom/authState";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { setAccesToken } from "../utils/getAccessToken";

const UserLogin = () => {
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const ref = useRef(false);
  const [count, setCount] = useRecoilState(authState);

  useEffect(() => {
    setAccesToken(searchParams[0].get("token") || "");
    window.location.href = "/mySchedule";
    // setAuth((prev) => searchParams[0].get("token") || "");
  }, [searchParams[0].get("token")]);
  // console.log(auth);

  // useEffect(() => {
  //   if (ref.current || !searchParams[0].get("token")) return;
  //   setAuth((prev) => searchParams[0].get("token") || "");
  //   ref.current = true;
  // }, [searchParams[0].get("token"), auth]);
  // console.log(auth);

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
