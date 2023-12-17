import { useEffect, useRef } from "react";
import TabNavigator from "../components/_common/TabNavigator";
import { shareKakao } from "../utils/shareKakaoLink";

const Home = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main>
      <button>공유하기</button>
    </main>
  );
};

export default Home;
