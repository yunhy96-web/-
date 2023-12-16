import { Dayjs } from "dayjs";

interface ICalendarController<T> {
  setStartDate: (startDate: Dayjs) => ICalendarController<T>;
  setEndDate: (endDate: Dayjs | null) => ICalendarController<T>;
  setCalendarDate: (newDate: Dayjs) => ICalendarController<T>;
  shiftDate: () => ICalendarController<T>;
  get: () => T;
}

type DateType = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

export const CalendarController = <T extends DateType>(
  data: T
): ICalendarController<T> => ({
  setStartDate: (startDate: Dayjs) => {
    let newDate = { ...data };
    newDate.startDate = startDate;
    newDate.endDate = null;

    return CalendarController(newDate);
  },
  setEndDate: (endDate: Dayjs | null) => {
    let newDate = { ...data };
    newDate.endDate = endDate;

    return CalendarController(newDate);
  },
  shiftDate: () => {
    let newDate = { ...data };
    let temp = newDate.startDate;
    newDate.startDate = newDate.endDate;
    newDate.endDate = temp;

    return CalendarController(newDate);
  },
  setCalendarDate: (newDate: Dayjs) => {
    const isExistFullDate = data.startDate && data.endDate;

    if (isExistFullDate) {
      return CalendarController(data).setStartDate(newDate);
    } else {
      const isBeforeStartDate = newDate.isBefore(data.startDate, "day");

      if (isBeforeStartDate) {
        return CalendarController(data) //
          .setEndDate(newDate)
          .shiftDate();
      } else {
        return CalendarController(data).setEndDate(newDate);
      }
    }
  },
  get: () => data,
});
