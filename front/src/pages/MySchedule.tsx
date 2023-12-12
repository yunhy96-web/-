import React, { useState } from "react";
import Header from "../components/_common/Header";
import * as Style from "../components/MySchedule/styles";
import MyScheduleCard from "../components/MySchedule/MyScheduleCard";

type Tab = "보관중인 일정" | "지난 일정";

const tabList: Tab[] = ["보관중인 일정", "지난 일정"];

const MySchedule = () => {
  const [tab, setTab] = useState<Tab>("보관중인 일정");

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
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />{" "}
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />{" "}
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />{" "}
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />{" "}
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />{" "}
        <MyScheduleCard
          title="오사카성"
          startDate="2023.12.12"
          endDate="2023.12.15"
        />
      </Style.Content>
    </>
  );
};

export default MySchedule;
