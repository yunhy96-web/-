import React, { DragEvent, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useSurvey from "./useSurvey";
import useConfirmModal from "./useConfirmModal";
import { NewSceduleInfo } from "../api/clova";

const useSchedule = () => {
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { survey } = useSurvey();
  const [day, setDay] = useState(1);

  const date = survey.startDate.add(day - 1, "day").format("YYYY-MM-DD");

  const queryClient = useQueryClient();

  const scheduleList = queryClient.getQueryData([
    "tripSchedule",
  ]) as NewSceduleInfo;

  const [schedule, setSchedule] = useState<NewSceduleInfo>(scheduleList);

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
    setSchedule((prev: NewSceduleInfo) => {
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
        schedule.id === id
          ? {
              ...schedule,
              detailPlans: [{ id: Math.random(), detailContent: description }],
            }
          : schedule
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
    if (schedule[date].length >= 20) {
      openConfirmModal({
        type: "LIMIT_SCHEDULE",
        confirm: closeConfirmModal,
      });
      return;
    }

    setSchedule((prev) => {
      return {
        ...prev,
        [date]: [
          ...prev[date],
          {
            ...prev[date][0],
            content: "",
            detailPlans: [
              {
                id: Math.random(),
                detailContent: "",
              },
            ],
            id: Math.random(),
            time: String(prev[date].length + 1),
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
