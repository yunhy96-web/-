import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Article from "../pages/Article";
import CreateSchedule from "../pages/CreateSchedule";
import MySchedule from "../pages/MySchedule";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Onboarding from "../pages/Onboarding";
import AddSchedule from "../pages/AddSchedule";
import MyDetailSchedule from "../pages/MyDetailSchedule";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "../pages/Error";

const Router = () => {
  return (
    <Layout>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={Error}>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mySchedule" element={<MySchedule />} />
            <Route
              path="/mySchedule/detail/:id"
              element={<MyDetailSchedule />}
            />
            <Route path="/createSchedule" element={<AddSchedule />} />
            <Route path="/createSchedule/:state" element={<CreateSchedule />} />
            <Route path="/article" element={<Article />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Layout>
  );
};

export default Router;
