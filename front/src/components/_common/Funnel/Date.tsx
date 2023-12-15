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
      <Style.Description>
        {`정확한 일정 추천을 위해 몇가지의\n사전 정보를 입력,진행한 뒤\nAI가 여행 일정을 생성해드립니다.`}
      </Style.Description>
      <Style.SubTitle>여행 날짜를 선택해주세요.</Style.SubTitle>
      <div style={{ display: "flex", gap: 16, paddingTop: 12 }}>
        <Style.DateBox
          onClick={() => {
            navigate("/createSchedule/date-calendar", { replace: true });
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon.Date />
            <div>
              {`${convertDateToString(startDate)} - ${convertDateToString(
                endDate
              )}`}
            </div>
          </div>
          <div>{`${tripPeriod}박 ${tripPeriod + 1}일`}</div>
        </Style.DateBox>
        {/* <Style.ScheduleDate>{`${tripPeriod}박 ${
          tripPeriod + 1
        }일`}</Style.ScheduleDate> */}
      </div>
      <Style.NextButton>
        <Button color="primary" text="다음" onClick={onNext} />
      </Style.NextButton>
    </Style.FunnelContainer>
  );
};

export default Date;
