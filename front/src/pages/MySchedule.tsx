import React, { useEffect, useState } from "react";
import Header from "../components/_common/Header";
import * as Style from "../components/MySchedule/styles";
import MyScheduleCard from "../components/MySchedule/MyScheduleCard";
import Button from "../components/_common/Button";
import { Icon } from "../assets";
import { useNavigate } from "react-router-dom";
import { shareKakao } from "../utils/shareKakaoLink";

type Tab = "보관중인 일정" | "지난 일정";

const tabList: Tab[] = ["보관중인 일정", "지난 일정"];

const MySchedule = () => {
  const [tab, setTab] = useState<Tab>("보관중인 일정");
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(0);

  const list = [
    {
      id: 1,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 2,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 3,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 4,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 5,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 6,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 7,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 8,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
    {
      id: 9,
      title: "오사카성",
      startDate: "2023.12.12",
      endDate: "2023.12.15",
    },
  ];

  return (
    <>
      <Style.Tab>
        {tabList.map((item) => (
          <Style.TabItem
            key={item}
            isSelected={tab === item}
            onClick={() => setTab(item)}
          >
            {item}
          </Style.TabItem>
        ))}
      </Style.Tab>
      <Style.Content>
        <Style.Title>내가 저장한 일정</Style.Title>
        {list.map((item) => (
          <MyScheduleCard
            isOpenDropdown={openDropdown === item.id}
            openDropdown={() => {
              if (openDropdown === item.id) {
                setOpenDropdown(0);
              } else {
                setOpenDropdown(item.id);
              }
            }}
            key={item.id}
            {...item}
          />
        ))}
      </Style.Content>
      <Style.CreateButton>
        <Button
          left={<Icon.AddSchedule />}
          text="AI한테 여행 일정 추천받으러 가기"
          onClick={() => navigate("/createSchedule/date")}
          color="gradient"
        />
      </Style.CreateButton>
      {/* <Style.CreateButton2>
        <Button
          left={<Icon.AddSchedule />}
          text="AI한테 여행 일정 추천받으러 가기"
          onClick={() => navigate("/createSchedule/date")}
          color="gradient"
        />
      </Style.CreateButton2> */}
    </>
  );
};

export default MySchedule;
