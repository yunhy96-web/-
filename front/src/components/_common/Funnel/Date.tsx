import dayjs, { Dayjs } from "dayjs";
import useSurvey from "../../../hooks/useSurvey";
import Button from "../Button";
import * as Style from "./style";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../assets";

type Props = {
  onNext: () => void;
};

const dayList = ["일", "월", "화", "수", "목", "금", "토"];

const Date = ({ onNext }: Props) => {
  const navigate = useNavigate();
  const { survey } = useSurvey();
  const { startDate, endDate } = survey;

  const convertDateToString = (date: Dayjs) => {
    return `${date?.format("MM.DD")} (${dayList[date?.day()]})`;
  };

  const tripPeriod = dayjs(endDate.format("YYYY-MM-DD")).diff(
    startDate.format("YYYY-MM-DD"),
    "day"
  );

  return (
    <Style.FunnelContainer>
      <Style.SubTitle>여행 날짜를 선택해주세요.</Style.SubTitle>
      <div style={{ display: "flex", gap: 16, paddingTop: 12 }}>
        <Style.DateBox>
          <Icon.Date />
          <div
            onClick={() => {
              navigate("/createSchedule/date-calendar", { replace: true });
            }}
          >
            {`${convertDateToString(startDate)} - ${convertDateToString(
              endDate
            )}`}
          </div>
        </Style.DateBox>
        <Style.ScheduleDate>{`${tripPeriod}박 ${
          tripPeriod + 1
        }일`}</Style.ScheduleDate>
      </div>

      <Style.NextButton>
        <Button color="primary" text="다음" onClick={onNext} />
      </Style.NextButton>
    </Style.FunnelContainer>
  );
};

export default Date;
