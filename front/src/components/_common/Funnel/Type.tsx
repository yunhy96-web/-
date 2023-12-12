import SelectBox from "../SelectBox";
import useSurvey from "../../../hooks/useSurvey";
import * as Style from "./style";
import Button from "../Button";
import Tag from "../Tag";

type Props = {
  onNext: () => void;
};

const styleList = [
  "짧은 시간에 많은걸 볼 수 있는 타이트한 일정",
  "느긋하게 힐링하는 여유로운 일정",
];

const typeList = [
  "관광",
  "휴양",
  "도심",
  "해변",
  "강변",
  "산림",
  "시골",
  "사막",
];

const interestList = [
  "쇼핑",
  "패션",
  "레저",
  "스포츠 관람",
  "예술",
  "음식",
  "테마파크",
  "리조트",
  "온천/스파",
  "콘서트",
  "버스킹",
  "골프",
  "목장",
  "유적지",
];

const Type = ({ onNext }: Props) => {
  const { survey, setTripType, setTripInterest, setTripStyle } = useSurvey();

  const isAlreadySelectedType = (type: string) => {
    return survey.trip.type.includes(type);
  };
  const isAlreadySelectedInterest = (interest: string) => {
    return survey.trip.interest.includes(interest);
  };

  return (
    <>
      <Style.FunnelContainer>
        <Style.SubTitle>여행 유형을 모두 선택해주세요.</Style.SubTitle>
        <Style.TagList>
          {typeList.map((type) => (
            <Tag
              key={type}
              text={type}
              onClick={() => setTripType(type)}
              isActive={isAlreadySelectedType(type)}
            />
          ))}
        </Style.TagList>
        <Style.SubTitle>관심사를 모두 선택해주세요. </Style.SubTitle>
        <Style.TagList>
          {interestList.map((type) => (
            <Tag
              key={type}
              text={type}
              onClick={() => setTripInterest(type)}
              isActive={isAlreadySelectedInterest(type)}
            />
          ))}
        </Style.TagList>
        <Style.SubTitle>선호하는 여행 스타일을 알려주세요.</Style.SubTitle>
        <Style.DestinationType>
          {styleList.map((style) => (
            <SelectBox
              key={style}
              text={style}
              isActive={survey.trip.style === style}
              onClick={setTripStyle}
            />
          ))}
        </Style.DestinationType>
      </Style.FunnelContainer>
      <Style.NextButton>
        <Button color="primary" text="다음" onClick={onNext} />
      </Style.NextButton>
    </>
  );
};

export default Type;
