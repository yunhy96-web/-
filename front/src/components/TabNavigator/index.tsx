import { useLocation, useNavigate } from "react-router-dom";
import * as Style from "./styles";

const TabNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const moveToTabPage = (path: string) => {
    if (location.pathname === path) {
      return;
    }
    navigate(path);
  };

  return (
    <Style.TabNavigator>
      <Style.TabList>
        <li onClick={() => moveToTabPage("/")}>홈</li>
        <li onClick={() => moveToTabPage("/mySchedule")}>일정 관리</li>
        <li onClick={() => moveToTabPage("/createSchedule")}>일정 추가</li>
        <li onClick={() => moveToTabPage("/Article")}>아티클</li>
        <li onClick={() => moveToTabPage("/myPage")}>마이페이지</li>
      </Style.TabList>
    </Style.TabNavigator>
  );
};

export default TabNavigator;
