import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import ProgressBar from "../_common/ProgressBar";
import Date from "../_common/Funnel/Date";
import * as Style from "./style";
import Header from "../_common/Header";
import DateCalendar from "../_common/Funnel/DateCalendar";
import Destination from "../_common/Funnel/Destination";
import Type from "../_common/Funnel/Type";
import { Icon } from "../../assets";
import Complete from "../_common/Funnel/Complete";
import AddDestination from "../_common/Funnel/AddDestination";
import useConfirmModal from "../../hooks/useConfirmModal";
import useSurvey from "../../hooks/useSurvey";

type PageType =
  | "date"
  | "destination"
  | "type"
  | "complete"
  | "loading"
  | "date-calendar"
  | "add-destination";

const pageList: PageType[] = ["date", "destination", "type", "loading"];

const FunnelSection = () => {
  const navigate = useNavigate();
  const params = useParams<{ state: PageType }>();

  const { initSurvey } = useSurvey();
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  // TODO: 저장하기
  const onSubmitModal = async () => {
    openConfirmModal({
      type: "COMPLETE",
      confirm: () => {
        initSurvey();
        navigate("/mySchedule");
      },
      cancel: closeConfirmModal,
    });
  };

  if (params.state === undefined) return null;
  if (params.state === "loading") return <Loading />;
  if (params.state === "complete") return <Complete onNext={onSubmitModal} />;

  return (
    <>
      <Header
        back={params.state !== "date-calendar"}
        borderBottom={params.state !== "date-calendar"}
        title={
          params.state === "date-calendar" ? "날짜 선택" : "사전 정보 수집"
        }
        right={
          params.state === "date-calendar"
            ? {
                onClick: () =>
                  navigate("/createSchedule/date", { replace: true }),
                content: <Icon.Close />,
              }
            : undefined
        }
      />
      <Style.FunnelContainer>
        {pageList.includes(params.state) && (
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
          <Type onNext={() => navigate("/createSchedule/add-destination")} />
        )}
        {params.state === "add-destination" && (
          <AddDestination onNext={() => navigate("/createSchedule/loading")} />
        )}
      </Style.FunnelContainer>
    </>
  );
};

export default FunnelSection;

// const isSurvey = () => {
//   const currentPageIndex = pageList.findIndex(
//     (item) => item === params.state
//   );
//   return currentPageIndex !== -1;
// };

// const skipToNextPage = () => {
//   if (!isSurvey()) return;
//   const currentPageIndex = pageList.findIndex(
//     (item) => item === params.state
//   );
//   navigate(`/createSchedule/${pageList[currentPageIndex + 1]}`);
// };
