import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import ProgressBar from "../_common/ProgressBar";
import Date from "../_common/Funnel/Date";
import * as Style from "./style";
import Header from "../_common/Header";
import DateCalendar from "../_common/Funnel/DateCalendar";
import Destination from "../_common/Funnel/Destination";
import Type from "../_common/Funnel/Type";

type PageType =
  | "date"
  | "destination"
  | "type"
  | "complete"
  | "loading"
  | "date-calendar";

const pageList: PageType[] = ["date", "destination", "type", "loading"];

const FunnelSection = () => {
  const navigate = useNavigate();
  const params = useParams<{ state: PageType }>();

  const isSurvey = () => {
    const currentPageIndex = pageList.findIndex(
      (item) => item === params.state
    );
    return currentPageIndex !== -1;
  };

  const skipToNextPage = () => {
    if (!isSurvey()) return;
    const currentPageIndex = pageList.findIndex(
      (item) => item === params.state
    );
    navigate(`/createSchedule/${pageList[currentPageIndex + 1]}`);
  };

  if (params.state === undefined) return null;

  return (
    <>
      <Header
        back
        title="사전 정보 수집"
        right={
          isSurvey()
            ? {
                onClick: skipToNextPage,
                content: <div>건너뛰기</div>,
              }
            : undefined
        }
      />
      <Style.FunnelContainer>
        {pageList.includes(params.state) && params.state !== "loading" && (
          <div style={{ margin: "24px 18px" }}>
            <ProgressBar
              currentPage={
                pageList.findIndex((item) => item === params.state) + 1
              }
              totalPage={3}
            />
          </div>
        )}
        {params.state === "date" && (
          <Date onNext={() => navigate("/createSchedule/destination")} />
        )}
        {params.state === "date-calendar" && (
          <DateCalendar onNext={() => navigate("/createSchedule/date")} />
        )}
        {params.state === "destination" && (
          <Destination onNext={() => navigate("/createSchedule/type")} />
        )}
        {params.state === "type" && (
          <Type onNext={() => navigate("/createSchedule/loading")} />
        )}
        {params.state === "loading" && <Loading />}
      </Style.FunnelContainer>
    </>
  );
};

export default FunnelSection;
