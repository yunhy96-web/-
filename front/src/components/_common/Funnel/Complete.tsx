import React, { DragEvent, useRef, useState } from "react";
import Header from "../Header";
import { Icon } from "../../../assets";
import { useNavigate } from "react-router-dom";
import * as Style from "./style";
import useSurvey from "../../../hooks/useSurvey";
import { Dayjs } from "dayjs";
import Button from "../Button";
import ScheduleCard from "../ScheduleCard";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onNext: () => void;
};

const Complete = ({ onNext }: Props) => {
  const navigate = useNavigate();
  const { survey, getTripPeriod } = useSurvey();
  const [day, setDay] = useState(1);
  const queryClient = useQueryClient();

  console.log(queryClient.getQueryData(["tripSchedule"]));

  const period = `${getTripPeriod()}박 ${getTripPeriod() + 1}일`;

  const dateFormatting = (date: Dayjs) => {
    return `${date.format("YYYY.MM.DD")}`;
  };

  const totalDay = getTripPeriod() + 4;

  const draggingItemIndex = useRef<number | null>(null);
  const draggingOverItemIndex = useRef<number | null>(null);

  const [availableOptionsArr, setAvailableOptionsArr] = useState([
    { id: 1, content: "오사카 성" },
    { id: 2, content: "도톤보리" },
    { id: 3, content: "유니버셜 스튜디오" },
    { id: 3, content: "유니버셜 스튜디오1" },
    { id: 3, content: "유니버셜 스튜디오2" },
    { id: 3, content: "유니버셜 스튜디오23" },
  ]);

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
    const copyListItems = [...availableOptionsArr]; // 1
    const dragItemContent = copyListItems[draggingItemIndex.current]; //2
    copyListItems.splice(draggingItemIndex.current, 1); //3
    copyListItems.splice(draggingOverItemIndex.current, 0, dragItemContent); // 4
    draggingItemIndex.current = draggingOverItemIndex.current;
    draggingOverItemIndex.current = null; //5
    setAvailableOptionsArr(copyListItems);
  }; //6

  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Header
        title={"AI기반 여행 일정"}
        right={{
          onClick: () => navigate("/createSchedule", { replace: true }),
          content: <Icon.Close />,
        }}
        borderBottom={false}
      />
      <div style={{ height: 63, minHeight: 63 }}></div>
      <Style.TitleSection>
        <Style.DestinationName>
          {survey.destination.city} 여행
        </Style.DestinationName>
        <Style.PeriodBox>{period}</Style.PeriodBox>
      </Style.TitleSection>
      <Style.SubRow>
        <Style.DatePeriod>
          {`${dateFormatting(survey.startDate)} ~ ${dateFormatting(
            survey.endDate
          )}`}
        </Style.DatePeriod>
        <Style.RestButton>초기화</Style.RestButton>
      </Style.SubRow>
      <Style.DayList>
        {Array.from({ length: totalDay }, (_, index) => (
          <div style={{ position: "relative", height: 45 }}>
            <Style.Day
              key={index}
              isSelected={day === index + 1}
              onClick={() => setDay(index + 1)}
            >
              {`Day ${index + 1}`}
            </Style.Day>
            <Style.UnderLine isSelected={day === index + 1} />
          </div>
        ))}
      </Style.DayList>
      <Style.Content>
        <Style.Wrapper>
          {availableOptionsArr.map((item, index) => (
            <ScheduleCard
              onDragStart={(e) => onDragStart(e, index)}
              onDragEnter={(e) => onAvailableItemDragEnter(e, index)}
              onDragOver={onDragOver}
              onDragEnd={onDragEnd}
              title={item.content}
            />
          ))}
          <Style.PlusButton>
            <Icon.Plus />
          </Style.PlusButton>
        </Style.Wrapper>
      </Style.Content>
      <Style.NextButton>
        <Button color="primary" text="저장하기" onClick={onNext} />
      </Style.NextButton>
    </>
  );
};

export default Complete;
