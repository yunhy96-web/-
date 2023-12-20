import { useEffect, useState } from "react";
import useConfirmModal from "./useConfirmModal";
import { NewSceduleInfo } from "../api/clova";
import dayjs from "dayjs";
import { ScheduleController } from "../controller/ScheduleController";

const useSchedule = (scheduleList: NewSceduleInfo = {}) => {
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [day, setDay] = useState(1);
  const [date, setDate] = useState("");

  const getDate = (schedule: NewSceduleInfo) => {
    const result = Object.keys(schedule);
    result.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return { startDate: dayjs(result[0]), endDate: dayjs(result.at(-1)) };
  };

  useEffect(() => {
    if (!scheduleList) return;
    setSchedule(scheduleList);
    const { startDate } = getDate(scheduleList);
    setDate(startDate.add(day - 1, "day").format("YYYY-MM-DD"));
  }, [scheduleList]);

  const [schedule, setSchedule] = useState<NewSceduleInfo>(scheduleList);

  const initData = (date: string) => {
    setSchedule((prev) => ({
      ...prev,
      [date]: scheduleList[date],
    }));
  };

  const onChangeDescription = (id: number, description: string) => {
    setSchedule((scheduleInfo) => {
      return ScheduleController(scheduleInfo, date) //
        .updateScheduleDescription(id, description);
    });
  };

  //액션
  const onChangeContent = (id: number, content: string) => {
    setSchedule((scheduleInfo) => {
      return ScheduleController(scheduleInfo, date) //
        .updateScheduleContent(id, content);
    });
  };

  //액션
  const onDeleteSchedule = (id: number) => {
    setSchedule((scheduleInfo) => {
      return ScheduleController(scheduleInfo, date) //
        .removeSchedule(id);
    });
  };

  const addNewSchedule = () => {
    //액션
    if (schedule[date].length >= 20) {
      openConfirmModal({
        type: "LIMIT_SCHEDULE",
        confirm: closeConfirmModal,
      });
      return;
    }

    //액션
    setSchedule((scheduleInfo) => {
      return ScheduleController(scheduleInfo, date) //
        .addNewSchedule();
    });
  };

  return {
    addNewSchedule,
    onChangeDescription,
    schedule,
    setSchedule,
    day,
    setDay,
    date,
    initData,
    onDeleteSchedule,
    onChangeContent,
    setDate,
  };
};

export default useSchedule;
