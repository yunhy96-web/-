import { useEffect, useState } from "react";
import * as Style from "../components/MySchedule/styles";
import MyScheduleCard from "../components/MySchedule/MyScheduleCard";
import Button from "../components/_common/Button";
import { Icon } from "../assets";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyScheduleList } from "../api/clova";
import { MyScheduleListController } from "../controller/MyScheduleListController";
import { authState } from "../atom/authState";
import { useRecoilState } from "recoil";
import useConfirmModal from "../hooks/useConfirmModal";

export type Tab = "내가 저장한 일정" | "지난 일정";

const tabList: Tab[] = ["내가 저장한 일정", "지난 일정"];

const MySchedule = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]) as { id: number };
  const { data: scheduleList } = useQuery({
    queryKey: ["mySchedule", "all"],
    queryFn: () => getMyScheduleList(user?.id || 0),
    enabled: !!user,
  });

  const [tab, setTab] = useState<Tab>("내가 저장한 일정");
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(0);

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
        <Style.Title>{tab}</Style.Title>
        {MyScheduleListController(scheduleList || [])
          .filter(tab)
          .get().length === 0 ? (
          <Style.Empty>
            {`아직 추가된 일정이 없습니다.\n하단의 버튼을 눌러 AI 여행 일정을\n 추천 받을 수 있습니다.`}
          </Style.Empty>
        ) : (
          MyScheduleListController(scheduleList || [])
            .filter(tab)
            .get()
            .map((item) => (
              <MyScheduleCard
                isOpenDropdown={openDropdown === item.id}
                onClose={() => setOpenDropdown(0)}
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
            ))
        )}
      </Style.Content>
      <Style.CreateButton>
        <Button
          left={<Icon.AddSchedule />}
          text="AI한테 여행 일정 추천받으러 가기"
          onClick={() => navigate("/createSchedule/date")}
          color="gradient"
        />
      </Style.CreateButton>
    </>
  );
};

export default MySchedule;
