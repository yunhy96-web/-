import { useLocation, useNavigate } from "react-router-dom";
import * as Style from "./styles";
import { Icon } from "../../../assets";

const TabNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const moveToTabPage = (path: string) => {
    if (isActive(path)) {
      return;
    }
    navigate(path);
  };

  const pathList = [
    { path: "/home", title: "홈", SVG: Icon.Home },
    { path: "/mySchedule", title: "일정관리", SVG: Icon.MySchedule },
    {
      path: "/createSchedule/save",
      title: "일정 추가",
      SVG: Icon.CreateSchedule,
    },
    { path: "/Article", title: "아티클", SVG: Icon.Article },
    { path: "/myPage", title: "마이페이지", SVG: Icon.MyPage },
  ];

  return (
    <Style.TabNavigator>
      <Style.TabList>
        {pathList.map(({ path, title, SVG }) => {
          return (
            <Style.TabItem
              key={path}
              isActive={isActive(path)}
              onClick={() => moveToTabPage(path)}
            >
              <SVG stroke={isActive(path) ? "#FF7A00" : "#757575"} />
              <div>{title}</div>
            </Style.TabItem>
          );
        })}
      </Style.TabList>
    </Style.TabNavigator>
  );
};

export default TabNavigator;
