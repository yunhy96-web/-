import dayjs, { Dayjs } from "dayjs";
import { DateType } from "../components/_common/Funnel/DateCalendar";

interface IDateController {
  isDuring: (newDate: Dayjs) => boolean;
  isEndDate: (newDate: Dayjs) => boolean;
  isStartDate: (newDate: Dayjs) => boolean;
  isBeforeToday: (newDate: Dayjs) => boolean;
  get: (newDate: Dayjs) => {
    isDuring: boolean;
    isEndDate: boolean;
    isStartDate: boolean;
    isBeforeToday: boolean;
  };
}

export const DateController = ({
  startDate,
  endDate,
}: DateType): IDateController => ({
  isDuring: (newDate: Dayjs) => {
    return (
      newDate.isBefore(endDate, "day") && newDate.isAfter(startDate, "day")
    );
  },
  isEndDate: (newDate: Dayjs) => {
    return (
      newDate.endOf("week").isSame(newDate, "day") ||
      newDate.endOf("month").isSame(newDate, "day")
    );
  },
  isStartDate: (newDate: Dayjs) => {
    return (
      newDate.startOf("week").isSame(newDate, "day") ||
      newDate.startOf("month").isSame(newDate, "day")
    );
  },
  isBeforeToday: (date: Dayjs) => {
    return date.isBefore(dayjs(), "day");
  },
  get: (newDate: Dayjs) => ({
    isDuring: DateController({ startDate, endDate }).isDuring(newDate),
    isStartDate: DateController({ startDate, endDate }).isStartDate(newDate),
    isEndDate: DateController({ startDate, endDate }).isEndDate(newDate),
    isBeforeToday: DateController({ startDate, endDate }).isBeforeToday(
      newDate
    ),
  }),
});
