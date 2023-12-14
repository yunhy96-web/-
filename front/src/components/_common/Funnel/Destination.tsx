import SelectBox from "../SelectBox";
import useSurvey from "../../../hooks/useSurvey";
import * as Style from "./style";
import Button from "../Button";

type Props = {
  onNext: () => void;
};

const typeList = ["국내여행", "해외여행"];

const Destination = ({ onNext }: Props) => {
  const { survey, setDestinationCity, setDestinationType } = useSurvey();

  return (
    <>
      <Style.FunnelContainer>
        {/* <Style.SubTitle>여행지를 선택해주세요.</Style.SubTitle>
        <Style.DestinationType>
          {typeList.map((type) => (
            <SelectBox
              key={type}
              text={type}
              isActive={survey.destination.type === type}
              onClick={setDestinationType}
            />
          ))}
        </Style.DestinationType> */}
        <Style.SubTitle>여행갈 나라(도시)를 입력해주세요.</Style.SubTitle>
        <Style.DestinationInput
          placeholder="10자까지 입력 가능합니다."
          value={survey.destination.city}
          onChange={(e) => setDestinationCity(e.target.value)}
        />
        <Style.InputLength>
          {survey.destination.city?.length || 0}/10
        </Style.InputLength>
      </Style.FunnelContainer>
      <Style.NextButton>
        <Button
          color={survey.destination.city ? "primary" : "disabled"}
          text="다음"
          onClick={onNext}
        />
      </Style.NextButton>
    </>
  );
};

export default Destination;
