import Calendar from "../Calendar";
import Button from "../Button";
import * as Style from "./style";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import useSurvey from "../../../hooks/useSurvey";
import { Icon } from "../../../assets";
import { useInView } from "react-intersection-observer";

type Props = {
  onNext: () => void;
};

export type DateType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

const DateCalendar = ({ onNext }: Props) => {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [calendarList, setCalendarList] = useState<Dayjs[]>([
    dayjs(),
    dayjs().add(1, "month"),
    dayjs().add(2, "month"),
  ]);

  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    if (inView) {
      const length = calendarList.length;
      const answer: Dayjs[] = [];
      for (let i = length; i < length + 3; i++) {
        answer.push(dayjs().add(i, "month"));
      }
      setCalendarList((prev) => [...prev, ...answer]);
    }
  }, [inView]);

  const { survey, setSurvey } = useSurvey();
  const [date, setDate] = useState<DateType>({
    startDate: survey.startDate,
    endDate: survey.endDate,
  });

  const setStartDate = (date: Dayjs) => {
    setDate((prev) => ({ ...prev, startDate: date, endDate: null }));
  };

  const setEndDate = (date: Dayjs) => {
    setDate((prev) => ({ ...prev, endDate: date }));
  };

  const setCalendarDate = (newDate: Dayjs) => {
    if (date.startDate && date.endDate) {
      setStartDate(newDate);
    } else {
      if (newDate.isBefore(date.startDate, "day")) {
        // 시작일이 종료일보다 이후일 경우 시작일, 종료일 변경
        setDate((prev) => ({
          ...prev,
          endDate: prev.startDate,
          startDate: newDate,
        }));
      } else {
        setEndDate(newDate);
      }
    }
  };

  return (
    <>
      <Style.DateContainer>
        <Style.Date>
          <Icon.Calendar />
          <div>
            {date.startDate?.format("MM.DD")}(
            {dayList[date.startDate?.day() as number]})
          </div>
        </Style.Date>
        <Icon.Line />
        <Style.Date>
          <Icon.Calendar />
          <div>
            {date.endDate
              ? `${date.endDate?.format("MM.DD")}(${
                  dayList[date.endDate?.day() as number]
                })`
              : "오는 날"}
          </div>
        </Style.Date>
      </Style.DateContainer>
      <Style.WeekDayList>
        {dayList.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </Style.WeekDayList>
      <Style.CalendarScrollBox>
        {calendarList.map((baseDate) => (
          <Calendar
            key={baseDate.format("YYYY-MM-DD")}
            baseDate={baseDate}
            date={date}
            setCalendarDate={setCalendarDate}
          />
        ))}
        <div ref={ref} />
      </Style.CalendarScrollBox>
      <Style.NextButton>
        <Button
          color={date.startDate && date.endDate ? "primary" : "disabled"}
          text="선택완료"
          onClick={() => {
            if (date.startDate === null || date.endDate === null) return;
            onNext();
            setSurvey((prev) => ({
              ...prev,
              startDate: date.startDate as Dayjs,
              endDate: date.endDate as Dayjs,
            }));
          }}
        />
      </Style.NextButton>
    </>
  );
};

export default DateCalendar;
