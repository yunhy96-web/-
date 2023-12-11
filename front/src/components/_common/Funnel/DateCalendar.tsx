import Calendar from "../Calendar";
import Button from "../Button";
import * as Style from "./style";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import useSurvey from "../../../hooks/useSurvey";

type Props = {
  onNext: () => void;
};

export type DateType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

const DateCalendar = ({ onNext }: Props) => {
  const calendarList = [
    dayjs(),
    dayjs().add(1, "month"),
    dayjs().add(2, "month"),
  ];
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

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
      </Style.CalendarScrollBox>
      <Style.NextButton>
        <Button
          color="primary"
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
