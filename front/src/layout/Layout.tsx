import React, { PropsWithChildren } from "react";
import TabNavigator from "../components/TabNavigator";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  return (
    <main>
      {children}
      {location.pathname !== "/createSchedule" && <TabNavigator />}
    </main>
  );
};

export default Layout;
