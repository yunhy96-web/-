import React, { useState } from "react";
import * as Style from "./style";
import MyScheduleCard from "../MyScheduleCard";
import { MySchedule } from "../../../controller/MyScheduleListController";

type Props = {
  tab: string;
  list: MySchedule[];
};

const Content = ({ tab, list }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(0);

  const hasItem = list.length > 0;

  const onClickDrowpdown = (openDropdown: number, id: number) => {
    const isAlreadyOpen = openDropdown === id;

    if (isAlreadyOpen) {
      setOpenDropdown(0);
    } else {
      setOpenDropdown(id);
    }
  };

  return (
    <Style.Content>
      <Style.Title>{tab}</Style.Title>
      {!hasItem ? (
        <Style.Empty>
          {`아직 추가된 일정이 없습니다.\n하단의 버튼을 눌러 AI 여행 일정을\n 추천 받을 수 있습니다.`}
        </Style.Empty>
      ) : (
        list.map((item) => (
          <MyScheduleCard
            key={item.id}
            isOpenDropdown={openDropdown === item.id}
            openDropdown={() => onClickDrowpdown(openDropdown, item.id)}
            {...item}
          />
        ))
      )}
    </Style.Content>
  );
};

export default Content;
