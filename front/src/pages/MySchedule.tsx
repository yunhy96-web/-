import * as Style from "../components/MySchedule/styles";
import Button from "../components/_common/Button";
import { Icon } from "../assets";
import { useNavigate } from "react-router-dom";
import Tab from "../components/MySchedule/Tab";
import Content from "../components/MySchedule/Content";
import useMySchedule from "../hooks/useMySchedule";

const MySchedule = () => {
  const {
    tab,
    tabList,
    setTab,
    filteredScheduleList,
    moveToCreateSchedule, //
  } = useMySchedule();

  return (
    <>
      <Tab
        list={tabList}
        selected={tab} //
        onClick={setTab}
      />
      <Content tab={tab} list={filteredScheduleList} />
      <Style.CreateButton>
        <Button
          left={<Icon.AddSchedule />}
          text="AI한테 여행 일정 추천받으러 가기"
          onClick={moveToCreateSchedule}
          color="gradient"
        />
      </Style.CreateButton>
    </>
  );
};

export default MySchedule;
