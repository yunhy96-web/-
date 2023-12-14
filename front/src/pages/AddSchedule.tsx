import * as Style from "../components/AddSchedule/style";
import Button from "../components/_common/Button";
import { Icon } from "../assets";
import { useNavigate } from "react-router-dom";

const AddSchedule = () => {
  const navigate = useNavigate();

  return (
    <Style.Layout>
      <img
        src="/images/logo.png"
        alt="logo"
        style={{ width: 125, height: 125, marginBottom: 38 }}
      />
      <Style.Text>
        {`정확한 일정 추천을 위해 몇가지의\n 사전 정보를 입력,진행한 뒤\n AI가 여행 계획을 생성해드립니다.`}
      </Style.Text>
      <Button
        text="일정 추가하러 가기"
        onClick={() => navigate("/createSchedule/date")}
        width={274}
        left={<Icon.AddSchedule />}
      />
    </Style.Layout>
  );
};

export default AddSchedule;
