import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import ProgressBar from "../_common/ProgressBar";

const FunnelSection = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      {params.state === "loading" ? (
        <Loading />
      ) : (
        <section>
          <div style={{ margin: "0 16px" }}>
            <ProgressBar />
          </div>
          <button onClick={() => navigate("/createSchedule/loading")}>
            저장하기
          </button>
        </section>
      )}
    </>
  );
};

export default FunnelSection;
