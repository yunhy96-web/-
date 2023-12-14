import React, { DragEvent, useRef, useState } from "react";
import { ScheduleByDate } from "../components/_common/Funnel/Complete";
import { useQueryClient } from "@tanstack/react-query";
import useSurvey from "./useSurvey";

const useSchedule = () => {
  const { survey } = useSurvey();
  const [day, setDay] = useState(1);

  const date = survey.startDate.add(day - 1, "day").format("YYYY-MM-DD");

  const queryClient = useQueryClient();

  const scheduleList = queryClient.getQueryData([
    "tripSchedule",
  ]) as ScheduleByDate;

  const [schedule, setSchedule] = useState<ScheduleByDate>(scheduleList);

  const draggingItemIndex = useRef<number | null>(null);
  const draggingOverItemIndex = useRef<number | null>(null);
  const onDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
    draggingItemIndex.current = index;
    (e.target as HTMLLIElement).classList.add("grabbing");
  };

  const onDragEnd = (e: DragEvent<HTMLLIElement>) => {
    (e.target as HTMLLIElement).classList.remove("grabbing");
  };

  const onAvailableItemDragEnter = (
    e: DragEvent<HTMLLIElement>,
    index: number
  ) => {
    if (draggingItemIndex.current === null) return;
    if (draggingItemIndex.current === index) return;

    draggingOverItemIndex.current = index;
    const copyListItems = [...schedule[date]]; // 1
    const dragItemContent = copyListItems[draggingItemIndex.current]; //2
    copyListItems.splice(draggingItemIndex.current, 1); //3
    copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent); // 4
    draggingItemIndex.current = draggingOverItemIndex.current;
    draggingOverItemIndex.current = null; //5
    setSchedule((prev: ScheduleByDate) => {
      return {
        ...prev,
        [date]: copyListItems,
      };
    });
  }; //6

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  const initData = (date: string) => {
    setSchedule((prev) => ({
      ...prev,
      [date]: scheduleList[date],
    }));
  };

  const onChangeDescription = (id: number, description: string) => {
    setSchedule((prev) => {
      const result = prev[date].map((schedule) =>
        schedule.id === id ? { ...schedule, description } : schedule
      );
      return {
        ...prev,
        [date]: result,
      };
    });
  };

  const onChangeContent = (id: number, content: string) => {
    setSchedule((prev) => {
      const result = prev[date].map((schedule) =>
        schedule.id === id ? { ...schedule, content } : schedule
      );
      return {
        ...prev,
        [date]: result,
      };
    });
  };

  const onDeleteSchedule = (id: number) => {
    setSchedule((prev) => {
      const result = prev[date].filter((schedule) => schedule.id !== id);
      return {
        ...prev,
        [date]: result,
      };
    });
  };

  const addItem = () => {
    setSchedule((prev) => {
      return {
        ...prev,
        [date]: [
          ...prev[date],
          {
            id: Math.random(),
            email: "",
            time: prev[date].length + 1,
            content: "",
            description: "",
            isEditable: true,
          },
        ],
      };
    });
  };

  return {
    addItem,
    onDragStart,
    onDragEnd,
    onAvailableItemDragEnter,
    onChangeDescription,
    onDragOver,
    schedule,
    setSchedule,
    day,
    setDay,
    date,
    initData,
    onDeleteSchedule,
    onChangeContent,
  };
};

export default useSchedule;
