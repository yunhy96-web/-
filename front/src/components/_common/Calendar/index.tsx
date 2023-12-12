import * as Style from "./style";
import createCalendar from "../../../utils/createCalendar";
import { Dayjs } from "dayjs";
import useSurvey from "../../../hooks/useSurvey";
import { DateType } from "../Funnel/DateCalendar";

type Props = {
  baseDate: Dayjs;
  date: DateType;
  setCalendarDate: (date: Dayjs) => void;
};

const Calendar = ({ baseDate, date, setCalendarDate }: Props) => {
  const monthList = createCalendar(baseDate);
  const { startDate, endDate } = date;

  return (
    <div>
      <Style.MonthTitle>{baseDate.month() + 1}월</Style.MonthTitle>
      <Style.Month>
        {monthList.map((weeks, idx) => (
          <Style.Week key={weeks[0].format("YYYY-MM-DD")}>
            {weeks.map((date) => (
              <Style.DateCell
                isSameMonth={date.month() === baseDate.month()}
                isStartDate={
                  date.startOf("week").isSame(date, "day") ||
                  date.startOf("month").isSame(date, "day")
                }
                isEndDate={
                  date.endOf("week").isSame(date, "day") ||
                  date.endOf("month").isSame(date, "day")
                }
                isDuring={
                  date.isBefore(endDate, "day") &&
                  date.isAfter(startDate, "day")
                }
                key={date.format("YYYY-MM-DD")}
              >
                <Style.Date
                  onClick={() => {
                    if (date.month() !== baseDate.month()) return;
                    setCalendarDate(date);
                  }}
                  isSelected={
                    date.month() === baseDate.month() &&
                    (date.isSame(startDate, "day") ||
                      date.isSame(endDate, "day"))
                  }
                  isDuring={
                    date.month() === baseDate.month() &&
                    date.isBefore(endDate, "day") &&
                    date.isAfter(startDate, "day")
                  }
                >
                  {date.month() === baseDate.month() ? date.date() : ""}
                </Style.Date>
                {date.month() === baseDate.month() &&
                  date.isBefore(endDate, "day") &&
                  (date.isAfter(startDate, "day") ||
                    date.isSame(startDate, "day")) &&
                  !date.endOf("week").isSame(date, "day") &&
                  !date.endOf("month").isSame(date, "day") && (
                    <Style.DuringDate />
                  )}
              </Style.DateCell>
            ))}
          </Style.Week>
        ))}
      </Style.Month>
    </div>
  );
};

export default Calendar;
