import { useMutation } from "@tanstack/react-query";
import React from "react";
import { saveScheduleList } from "../api/clova";

const useSaveScehdule = () => {
  return useMutation({
    mutationKey: ["saveSchedule"],
    mutationFn: saveScheduleList,
  });
};

export default useSaveScehdule;
