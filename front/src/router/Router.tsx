import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateSchedule from "../pages/CreateSchedule";
import MySchedule from "../pages/MySchedule";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Onboarding from "../pages/Onboarding";
import MyDetailSchedule from "../pages/MyDetailSchedule";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "../pages/Error";
import UserLogin from "../pages/UserLogin";
import { useQuery } from "@tanstack/react-query";
import { getUserState } from "../api/clova";

const Router = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserState,
    staleTime: Infinity,
  });
  return (
    <Layout>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={Error}>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mySchedule" element={<MySchedule />} />
            <Route
              path="/mySchedule/detail/:id"
              element={<MyDetailSchedule />}
            />
            <Route path="/createSchedule/:state" element={<CreateSchedule />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
