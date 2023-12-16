import { MyScheduleList } from "../api/clova";
import { Tab } from "../pages/MySchedule";
import convertDateFormmat from "../utils/convertDateFormmat";

interface IMyScheduleListController {
  filter: (tab: Tab) => IMyScheduleListController;
  get: () => {
    id: number;
    groupId: number;
    title: string;
    startDate: string;
    endDate: string;
  }[];
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
      return {
        id: item.id,
        groupId: item.groupid,
        title: `${item.destination} 여행`,
        startDate: convertDateFormmat(item.period.split(" - ")[0]),
        endDate: convertDateFormmat(item.period.split(" - ")[1]),
      };
    });
  },
});
