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
import useConfirmModal from "../../../hooks/useConfirmModal";

type Props = {
  onNext: () => void;
};

export type Schedule = {
  id: number;
  realday: string;
  email: string;
  time: number;
  content: string;
  description: string;
  isEditable: boolean;
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
    onDeleteSchedule,
    addItem,
    onChangeContent,
  } = useSchedule();

  const period = `${getTripPeriod()}박 ${getTripPeriod() + 1}일`;

  const dateFormatting = (date: Dayjs) => {
    return `${date.format("YYYY.MM.DD")}`;
  };

  const totalDay = getTripPeriod() + 1;

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const openInitModal = () => {
    openConfirmModal({
      type: "INIT_SCHEDULE",
      confirm: () => initData(date),
      cancel: closeConfirmModal,
    });
  };

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
      <div style={{ marginLeft: 16 }}>
        <PeriodTag>{period}</PeriodTag>
      </div>
      <Style.TitleSection>
        <Style.DestinationName>
          {survey.destination.city} 여행
        </Style.DestinationName>
      </Style.TitleSection>
      <Style.SubRow>
        <Style.DatePeriod>
          {`${dateFormatting(survey.startDate)} ~ ${dateFormatting(
            survey.endDate
          )}`}
        </Style.DatePeriod>
        <Style.RestButton onClick={openInitModal}>초기화</Style.RestButton>
      </Style.SubRow>
      <Style.DayList>
        {Array.from({ length: totalDay }, (_, index) => (
          <div key={index} style={{ position: "relative", height: 45 }}>
            <Style.Day
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
              onDelete={() => onDeleteSchedule(item.id)}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              title={item.content}
              description={item.description}
              isEditable={item.isEditable}
              onChangeDescription={(value) =>
                onChangeDescription(item.id, value)
              }
              onChangeContent={(value) => onChangeContent(item.id, value)}
              key={item.id}
            />
          ))}
          <Style.CreateButtonBox>
            <Style.PlusButton>
              <Icon.RoundPlus />
              <div>다른 장소 더 추천받기</div>
            </Style.PlusButton>
            <Style.PlusButton onClick={addItem}>
              <Icon.RoundPlus />
              <div>직접 입력해서 추가하기</div>
            </Style.PlusButton>
          </Style.CreateButtonBox>
        </Style.Wrapper>
      </Style.Content>
      <Style.NextButton>
        <Button color="primary" text="저장하기" onClick={onNext} />
      </Style.NextButton>
    </>
  );
};

export default Complete;
