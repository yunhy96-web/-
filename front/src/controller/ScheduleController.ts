import { NewSceduleInfo } from "../api/clova";
import { addItem, filter, isSame, map, updateFieldByName } from "../utils";

export const ScheduleController = (
  scheduleInfo: NewSceduleInfo,
  date: string
) => {
  return {
    removeSchedule: (id: number) => {
      return updateFieldByName(
        scheduleInfo,
        date,
        filter(scheduleInfo[date], (schedule) => !isSame(schedule.id, id))
      );
    },
    updateScheduleContent: (id: number, content: string) => {
      const result = map(scheduleInfo[date], (schedule) => {
        return isSame(schedule.id, id)
          ? updateFieldByName(schedule, "content", content)
          : schedule;
      });

      return updateFieldByName(scheduleInfo, date, result);
    },
    updateScheduleDescription: (id: number, description: string) => {
      const result = map(scheduleInfo[date], (schedule) =>
        isSame(schedule.id, id)
          ? updateFieldByName(schedule, "detailPlans", [
              { id: Math.random(), detailContent: description },
            ])
          : schedule
      );
      return updateFieldByName(scheduleInfo, date, result);
    },
    addNewSchedule: () => {
      const initialData = {
        ...scheduleInfo[date][0],
        content: "",
        detailPlans: [
          {
            id: Math.random(),
            detailContent: "",
          },
        ],
        id: Math.random(),
        isEditable: true,
      };

      return updateFieldByName(
        scheduleInfo,
        date,
        addItem(scheduleInfo[date], initialData)
      );
    },
  };
};
