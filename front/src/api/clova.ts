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

export type SaveScheduleListType = {
  id: number;
  realday: string;
  content: string;
  email: string;
  time: string;
  detailPlans: [
    {
      id: number;
      detailContent: string;
    }
  ];
};

export type ScheduleById = {
  [key: string]: (Omit<SaveScheduleListType, "realday"> & {
    description: string;
  })[];
};

export const saveScheduleList = async (info: {
  groupId: number;
  scheduleList: {
    realday: string;
    content: string;
    email: string;
    time: string;
    detailPlans: [
      {
        detailContent: string;
      }
    ];
  }[];
}) => {
  const { data } = await api.post(
    `create-multiple-and-delete?groupid=${info.groupId}`,
    info.scheduleList
  );
  return data;
};

export const getScheduleById = async (id: number) => {
  return getScheduleListById(
    [
      {
        id: 1,
        realday: "2023-12-15",
        email: "1@2",
        time: "1",
        content: "아침 식사 후 경복궁 관람",
        // createdAt: "2023-12-13T20:04:28.93803",
        // updatedAt: "2023-12-13T20:04:28.93803",
        detailPlans: [
          {
            id: 2,
            detailContent: "아침 6시 시작",
          },
        ],
      },
    ],
    false
  );
};

const getScheduleListById = (
  scheduleList: SaveScheduleListType[],
  isEditable: boolean
) => {
  return scheduleList.reduce((accr, { realday, ...rest }) => {
    if (accr[convertDateFormmat(realday)]) {
      accr[convertDateFormmat(realday)].push({
        ...rest,
        description: rest.detailPlans[0].detailContent,
      });
    } else {
      accr[convertDateFormmat(realday)] = [
        { ...rest, description: rest.detailPlans[0].detailContent },
      ];
    }
    return accr;
  }, {} as ScheduleById);
};
