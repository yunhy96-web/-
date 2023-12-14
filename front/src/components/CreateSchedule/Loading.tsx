import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { createTripSchedule, getTripSchedule } from "../../api/clova";
import { useNavigate } from "react-router-dom";
import * as Style from "./style";
import useSurvey from "../../hooks/useSurvey";
import { ThreeDots } from "react-loader-spinner";

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
      content1: `기간: ${survey.startDate.format(
        "YYYY년 MM월 DD일"
      )} - ${survey.endDate.format("YYYY년 MM월 DD일")}`,
      content2: `여행지: ${survey.destination.city}`,
      content3: `관심사: ${[...survey.trip.interest, ...survey.trip.type].join(
        ", "
      )}, 할 것`,
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
        style={{ width: 125, height: 125, marginBottom: 10 }}
      />
      <div style={{ marginBottom: 10 }}>
        <ThreeDots
          height="60"
          width="60"
          radius="9"
          color="#FF7A00"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          // wrapperClassName=""
          visible={true}
        />
      </div>
      <Style.LoadingTitle>AI가 여행 일정을 추천중입니다.</Style.LoadingTitle>
      <Style.LoadingSubTitle>잠시만 기다려주세요.</Style.LoadingSubTitle>
    </Style.LoadingContainer>
  );
};

export default Loading;
