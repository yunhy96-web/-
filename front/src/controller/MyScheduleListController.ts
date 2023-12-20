import { MyScheduleList } from "../api/clova";
import { Tab } from "../hooks/useMySchedule";
import convertDateFormmat from "../utils/convertDateFormmat";

export type MySchedule = {
  id: number;
  groupId: number;
  title: string;
  startDate: string;
  endDate: string;
};

interface IMyScheduleListController {
  filter: (tab: Tab) => IMyScheduleListController;
  get: () => MySchedule[];
}

export const MyScheduleListController = (
  scheduleList: MyScheduleList[]
): IMyScheduleListController => ({
  filter: (tab: Tab) => {
    let filteredList = scheduleList;
    if (tab === "내가 저장한 일정") {
      filteredList = scheduleList.filter((item) => !item.passed);
    } else {
      filteredList = scheduleList.filter((item) => item.passed);
    }
    return MyScheduleListController(filteredList);
  },
  get: () => {
    return scheduleList.map((item) => {
      const [startDate, endDate] = item.period.split(" - ");

      return {
        id: item.id,
        groupId: item.groupid,
        title: `${item.destination} 여행`,
        startDate: convertDateFormmat(startDate),
        endDate: convertDateFormmat(endDate),
      };
    });
  },
});
