import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Article from "../pages/Article";
import CreateSchedule from "../pages/CreateSchedule";
import MySchedule from "../pages/MySchedule";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Onboarding from "../pages/Onboarding";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mySchedule" element={<MySchedule />} />
          <Route path="/createSchedule" element={<CreateSchedule />} />
          <Route path="/article" element={<Article />} />
          <Route path="/myPage" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
