import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { createTripSchedule } from "../../api/clova";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  const { isPending, isSuccess, isError, mutate } = useMutation({
    mutationKey: ["createdTripSchedule"],
    mutationFn: createTripSchedule,
  });

  useEffect(() => {
    if (!isSuccess) {
      mutate({
        content: "기간: 2023년 12월 12일 - 2023년 12월 15일",
        content2: "여행지: 도쿄",
        content3: "관심사: 음식, 관광",
      });
    } else {
      navigate("/createSchedule/complete");
    }
  }, []);

  return <div>로딩중</div>;
};

export default Loading;
