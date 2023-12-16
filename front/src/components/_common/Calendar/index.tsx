import * as Style from "./style";
import createCalendar from "../../../utils/createCalendar";
import { Dayjs } from "dayjs";
import { DateType } from "../Funnel/DateCalendar";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { DateController } from "../../../controller/DateController";

type Props = {
  baseDate: Dayjs;
  date: DateType;
  setCalendarDate: (date: Dayjs) => void;
};

const Calendar = ({ baseDate, date, setCalendarDate }: Props) => {
  const monthList = createCalendar(baseDate);
  const { startDate, endDate } = date;
  const dateController = DateController(date);
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const onClickDate = (date: Dayjs) => {
    const isSameMonth = date.month() === baseDate.month();
    const { isBeforeToday } = dateController.get(date);
    const isDisabled = !isSameMonth || isBeforeToday;
    if (isDisabled) return;

    if (!endDate && startDate && Math.abs(startDate.diff(date, "day")) >= 10) {
      openConfirmModal({
        type: "OVER_DATE",
        confirm: closeConfirmModal,
      });
      return;
    }

    setCalendarDate(date);
  };

  return (
    <div>
      <Style.MonthTitle>
        {baseDate.year()}년 {baseDate.month() + 1}월
      </Style.MonthTitle>
      <Style.Month>
        {monthList.map((weeks) => (
          <Style.Week key={weeks[0].format("YYYY-MM-DD")}>
            {weeks.map((date) => {
              const { isDuring, isEndDate, isStartDate, isBeforeToday } =
                dateController.get(date);
              const isSameMonth = date.month() === baseDate.month();

              return (
                <Style.DateCell
                  isSameMonth={date.month() === baseDate.month()}
                  isStartDate={isStartDate}
                  isEndDate={isEndDate}
                  isDuring={isDuring}
                  key={date.format("YYYY-MM-DD")}
                >
                  <Style.Date
                    onClick={() => onClickDate(date)}
                    disabled={isBeforeToday}
                    isSelected={
                      isSameMonth &&
                      (date.isSame(startDate, "day") ||
                        date.isSame(endDate, "day"))
                    }
                    isDuring={isSameMonth && isDuring}
                  >
                    {isSameMonth ? date.date() : ""}
                  </Style.Date>
                  {isSameMonth &&
                    date.isBefore(endDate, "day") &&
                    (date.isAfter(startDate, "day") ||
                      date.isSame(startDate, "day")) &&
                    !date.endOf("week").isSame(date, "day") &&
                    !date.endOf("month").isSame(date, "day") && (
                      <Style.DuringDate />
                    )}
                </Style.DateCell>
              );
            })}
          </Style.Week>
        ))}
      </Style.Month>
    </div>
  );
};

export default Calendar;
