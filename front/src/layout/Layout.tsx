import React, { PropsWithChildren, useEffect } from "react";
import TabNavigator from "../components/_common/TabNavigator";
import * as Style from "./styles";

const Layout = ({ children }: PropsWithChildren) => {
  const tabNavigatorPathList = [
    "/home",
    "/mySchedule",
    "/createSchedule",
    "/Article",
    "/myPage",
  ];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        // background: "black",
        height: "100%",
      }}
    >
      <Style.Layout>
        {children}
        {/* {tabNavigatorPathList.includes(location.pathname) && <TabNavigator />} */}
      </Style.Layout>
    </div>
  );
};

export default Layout;
