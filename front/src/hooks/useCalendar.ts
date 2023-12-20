import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import createCalendar from "../utils/createCalendar";

const useCalendar = () => {
  const [baseDate, setBaseDate] = useState<Dayjs>(dayjs());

  const prevMonth = () => {
    setBaseDate(baseDate.subtract(1, "month"));
  };

  const nextMonth = () => {
    setBaseDate(baseDate.add(1, "month"));
  };

  const monthList = useMemo(() => createCalendar(baseDate), [baseDate]);

  return {
    baseDate,
    monthList,
    prevMonth,
    nextMonth,
  };
};

export default useCalendar;
