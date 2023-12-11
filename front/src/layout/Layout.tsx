import React, { PropsWithChildren, useEffect } from "react";
import TabNavigator from "../components/_common/TabNavigator";
import { useLocation } from "react-router-dom";
import * as Style from "./styles";
import axios from "axios";

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const tabNavigatorPathList = [
    "/home",
    "/mySchedule",
    "/createSchedule",
    "/Article",
    "/myPage",
  ];

  return (
    <Style.Layout>
      {children}
      {tabNavigatorPathList.includes(location.pathname) && <TabNavigator />}
    </Style.Layout>
  );
};

export default Layout;
