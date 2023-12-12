import Header from "../Header";
import { Icon } from "../../../assets";
import { useNavigate } from "react-router-dom";
import * as Style from "./style";
import useSurvey from "../../../hooks/useSurvey";
import { Dayjs } from "dayjs";
import Button from "../Button";
import ScheduleCard from "../ScheduleCard";
import useSchedule from "../../../hooks/useSchedule";
import { PeriodTag } from "../Tag/PeriodTab";

type Props = {
  onNext: () => void;
};

export type Schedule = {
  id: number;
  realday: string;
  email: string;
  time: string;
  content: string;
  description: string;
};

export type ScheduleByDate = { [key: string]: Omit<Schedule, "realday">[] };

const Complete = ({ onNext }: Props) => {
  const navigate = useNavigate();
  const { survey, getTripPeriod } = useSurvey();

  const {
    day,
    schedule,
    date,
    onChangeDescription,
    setDay,
    initData,
    onDragStart,
    onDragEnd,
    onAvailableItemDragEnter,
    onDragOver,
  } = useSchedule();

  const period = `${getTripPeriod()}박 ${getTripPeriod() + 1}일`;

  const dateFormatting = (date: Dayjs) => {
    return `${date.format("YYYY.MM.DD")}`;
  };

  const totalDay = getTripPeriod() + 1;

  return (
    <>
      <Header
        title={"AI기반 여행 일정"}
        right={{
          onClick: () => navigate("/createSchedule", { replace: true }),
          content: <Icon.Close />,
        }}
        borderBottom={false}
      />
      <div style={{ height: 63, minHeight: 63 }}></div>
      <Style.TitleSection>
        <Style.DestinationName>
          {survey.destination.city} 여행
        </Style.DestinationName>
        <PeriodTag>{period}</PeriodTag>
      </Style.TitleSection>
      <Style.SubRow>
        <Style.DatePeriod>
          {`${dateFormatting(survey.startDate)} ~ ${dateFormatting(
            survey.endDate
          )}`}
        </Style.DatePeriod>
        <Style.RestButton onClick={initData}>초기화</Style.RestButton>
      </Style.SubRow>
      <Style.DayList>
        {Array.from({ length: totalDay }, (_, index) => (
          <div style={{ position: "relative", height: 45 }}>
            <Style.Day
              key={index}
              isSelected={day === index + 1}
              onClick={() => setDay(index + 1)}
            >
              {`Day ${index + 1}`}
            </Style.Day>
            <Style.UnderLine isSelected={day === index + 1} />
          </div>
        ))}
      </Style.DayList>
      <Style.Content>
        <Style.Wrapper>
          {schedule[date]?.map((item, index) => (
            <ScheduleCard
              onDragStart={(e) => onDragStart(e, index)}
              onDragEnter={(e) => onAvailableItemDragEnter(e, index)}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              title={item.content}
              description={item.description}
              onChangeDescription={(value) =>
                onChangeDescription(item.id, value)
              }
              key={item.id}
            />
          ))}
          <Style.PlusButton>
            <Icon.Plus />
          </Style.PlusButton>
        </Style.Wrapper>
      </Style.Content>
      <Style.NextButton>
        <Button color="primary" text="저장하기" onClick={onNext} />
      </Style.NextButton>
    </>
  );
};

export default Complete;
