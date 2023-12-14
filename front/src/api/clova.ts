import { api } from ".";
import { Schedule } from "../components/_common/Funnel/Complete";
import convertDateFormmat from "../utils/convertDateFormmat";

type TripContent = {
  content1: string;
  content2: string;
  content3: string;
};
export const createTripSchedule = async (content: TripContent) => {
  const { data } = await api.post("/clova/send-request2", content);
  return data;
};

export const getTripSchedule = async () => {
  const { data } = await api.get("/plans");
  return getScheduleListByDate(data, false);
};

const getScheduleListByDate = (
  scheduleList: Schedule[],
  isEditable: boolean
) => {
  return scheduleList.reduce((accr, { realday, ...rest }) => {
    if (accr[convertDateFormmat(realday)]) {
      accr[convertDateFormmat(realday)].push({
        ...rest,
        description: "",
        isEditable,
      });
    } else {
      accr[convertDateFormmat(realday)] = [
        { ...rest, description: "", isEditable },
      ];
    }
    return accr;
  }, {} as { [key: string]: Omit<Schedule, "realday">[] });
};
