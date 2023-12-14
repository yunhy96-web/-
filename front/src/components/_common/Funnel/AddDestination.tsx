import React, { ChangeEvent } from "react";
import Button from "../Button";
import * as Style from "./style";
import useSurvey from "../../../hooks/useSurvey";

type Props = {
  onNext: () => void;
};

const AddDestination = ({ onNext }: Props) => {
  const { survey, setSurvey } = useSurvey();

  const onChangeDestination = (e: ChangeEvent<HTMLInputElement>) => {
    setSurvey((prev) => ({ ...prev, addedDestination: e.target.value }));
  };

  return (
    <div style={{ padding: "0 16px", background: "#F7F7F7", height: "100%" }}>
      <Style.AddDestinationText>
        <div>
          {`여행 일정 중 꼭 가고싶은 장소를 추가해보세요.\nAI가 해당 장소를 포함하여 추천해드립니다.`}
        </div>
        <Style.GrayText>(선택 사항)</Style.GrayText>
      </Style.AddDestinationText>
      <Style.DestinationInput
        value={survey.addedDestination}
        onChange={onChangeDestination}
        placeholder="장소를 입력해주세요."
      />
      <Style.InputLength>{survey.addedDestination.length}/10</Style.InputLength>
      <Style.NextButton>
        <Button
          color="primary"
          text="여행 일정 추천 받으러 가기"
          onClick={onNext}
        />
      </Style.NextButton>
    </div>
  );
};

export default AddDestination;
