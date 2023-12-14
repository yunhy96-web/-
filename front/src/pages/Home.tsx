import { useEffect, useRef } from "react";
import TabNavigator from "../components/_common/TabNavigator";
import { shareKakao } from "../utils/shareKakaoLink";

const Home = () => {
  const flag = useRef(false);
  useEffect(() => {
    // 카카오 SDK
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    //
    return () => {
      document.body.removeChild(script);
      // flag.current = false;
    };
  }, []);

  return (
    <main>
      <button
        onClick={() => shareKakao("http://localhost:3000/mySchedule", "hi")}
      >
        공유하기
      </button>
    </main>
  );
};

export default Home;
