import { api } from ".";
import { Schedule } from "../components/_common/Funnel/Complete";
import convertDateFormmat from "../utils/convertDateFormmat";

type TripContent = {
  content1: string;
  content2: string;
  content3: string;
};
export const createTripSchedule = async (content: TripContent) => {
  try {
    const { data } = await api.post("/api/clova/send-request2", content);
    return data;
  } catch (e) {
    // window.location.href = "/error";
  }
};

export type ScheduleInfo = {
  id: number;
  groupid: number;
  realday: string;
  user: {
    id: number;
    username: string;
    nickname: string;
    image: string;
  };
  time: string;
  createdAt?: string;
  updatedAt?: string;
  content: string;
  detailPlans: {
    id: number;
    detailContent: string;
  }[];
};

export const getTripSchedule = async ({ groupId }: { groupId: number }) => {
  try {
    const { data } = await api.get<ScheduleInfo[]>(
      `/api/plans/detailplans/${groupId}`
    );
    return getScheduleListByDate(data, false);
  } catch (e) {
    console.log(e);
    // window.location.href = "/error";
  }
};

export type NewSceduleInfo = {
  [key: string]: (Omit<ScheduleInfo, "realday"> & { isEditable: boolean })[];
};

const getScheduleListByDate = (
  scheduleList: ScheduleInfo[],
  isEditable: boolean
) => {
  return scheduleList.reduce((accr, { realday, ...rest }) => {
    if (accr[convertDateFormmat(realday)]) {
      accr[convertDateFormmat(realday)].push({
        ...rest,
        detailPlans: [
          rest?.detailPlans[0] ?? { id: Math.random(), detailContent: "" },
        ],
        isEditable,
      });
    } else {
      accr[convertDateFormmat(realday)] = [{ ...rest, isEditable }];
    }
    return accr;
  }, {} as NewSceduleInfo);
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
  scheduleList: ScheduleInfo[];
}) => {
  try {
    const { data } = await api.post(
      `/api/plans/create-multiple-and-delete?groupid=${info.groupId}`,
      info.scheduleList
    );
    return data;
  } catch (e) {
    window.location.href = "/error";
  }
};

export type MyScheduleList = {
  id: number;
  groupid: number;
  destination: string;
  period: string;
  userid: number;
  passed: boolean;
};

export const getMyScheduleList = async (userId: number) => {
  try {
    const { data } = await api.get<MyScheduleList[]>(
      `/api/clova/totalgroupplan/${userId}`
    );

    return data;
  } catch (e) {
    // window.location.href = "/error";
  }
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

export const deleteSchedule = async (id: number) => {
  try {
    const { data } = await api.delete(`/groupplan/delete/${id}`);
    return data;
  } catch (e) {
    window.location.href = "/error";
  }
};

export const getUserState = async () => {
  try {
    const { data } = await api.get(`/getuserinfo`);
    return data;
  } catch (e) {
    // window.location.href = "/error";
  }
};

export const updateTripName = async ({
  destination,
  groupId,
}: {
  destination: string;
  groupId: number;
}) => {
  try {
    const { data } = await api.put(`${groupId}/destination`, { destination });
    return data;
  } catch (e) {
    window.location.href = "/error";
  }
};
