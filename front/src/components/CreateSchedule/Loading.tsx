import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { createTripSchedule, getTripSchedule } from "../../api/clova";
import { useNavigate } from "react-router-dom";
import * as Style from "./style";
import useSurvey from "../../hooks/useSurvey";

const Loading = () => {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const flag = useRef(false);

  const { survey } = useSurvey();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["tripSchedule"],
    queryFn: getTripSchedule,
    enabled: isComplete,
    staleTime: Infinity,
  });

  const { isPending, isError, mutate } = useMutation({
    mutationKey: ["createdTripSchedule"],
    mutationFn: createTripSchedule,
    onSuccess: () => {
      setIsComplete(true);
    },
  });

  useEffect(() => {
    if (flag.current) return;
    mutate({
      content1: "기간: 2023년 12월 12일 - 2023년 12월 15일",
      content2: "여행지: 도쿄",
      content3: "관심사: 음식, 관광",
    });
    flag.current = true;
  }, []);

  const queryClient = useQueryClient();
  const muatationCache = queryClient.getMutationCache();

  useEffect(() => {
    if (isSuccess) {
      navigate("/createSchedule/complete");
    }
  }, [isSuccess]);

  return (
    <Style.LoadingContainer>
      <img
        src="/images/logo.png"
        alt="logo"
        style={{ width: 125, height: 125, marginBottom: 25 }}
      />
      <div style={{ marginBottom: 39 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="76"
          height="18"
          viewBox="0 0 76 18"
          fill="none"
        >
          <circle cx="9" cy="9" r="9" fill="#FF7A00" />
          <circle cx="42" cy="9" r="5" fill="#757575" />
          <circle cx="71" cy="9" r="5" fill="#757575" />
        </svg>
      </div>
      <Style.LoadingTitle>AI가 여행 일정을 추천중입니다.</Style.LoadingTitle>
      <Style.LoadingSubTitle>잠시만 기다려주세요.</Style.LoadingSubTitle>
    </Style.LoadingContainer>
  );
};

export default Loading;
