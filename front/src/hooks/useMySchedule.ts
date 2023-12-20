import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getMyScheduleList } from "../api/clova";
import { MyScheduleListController } from "../controller/MyScheduleListController";
import { useNavigate } from "react-router-dom";

export type Tab = "내가 저장한 일정" | "지난 일정";

const tabList: Tab[] = ["내가 저장한 일정", "지난 일정"];

const useMySchedule = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as { id: number };

  const [tab, setTab] = useState<Tab>("내가 저장한 일정");

  const { data: scheduleList } = useQuery({
    queryKey: ["mySchedule", "all"],
    queryFn: () => getMyScheduleList(user?.id || 0),
    enabled: !!user,
  });

  const filteredScheduleList = MyScheduleListController(scheduleList || [])
    .filter(tab)
    .get();

  const moveToCreateSchedule = () => {
    navigate("/create-schedule");
  };

  return {
    tab,
    tabList,
    filteredScheduleList,
    setTab,
    moveToCreateSchedule,
  };
};

export default useMySchedule;
