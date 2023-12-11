import { useRecoilState } from "recoil";
import { surveyState } from "../atom/surveyState";

const useSurvey = () => {
  const [survey, setSurvey] = useRecoilState(surveyState);

  const setDestinationType = (type: string) => {
    if (type === survey.destination.type) return;
    setSurvey((prev) => ({
      ...prev,
      destination: {
        ...prev.destination,
        type,
      },
    }));
  };

  const setDestinationCity = (city: string) => {
    setSurvey((prev) => ({
      ...prev,
      destination: {
        ...prev.destination,
        city,
      },
    }));
  };

  const setTripType = (type: string) => {
    setSurvey((prev) => ({
      ...prev,
      trip: { ...prev.trip, type: toggleButtonList(prev.trip.type, type) },
    }));
  };

  const setTripInterest = (interest: string) => {
    setSurvey((prev) => ({
      ...prev,
      trip: {
        ...prev.trip,
        interest: toggleButtonList(prev.trip.interest, interest),
      },
    }));
  };

  const setTripStyle = (style: string) => {
    setSurvey((prev) => ({
      ...prev,
      trip: {
        ...prev.trip,
        style,
      },
    }));
  };

  return {
    survey,
    setSurvey,
    setDestinationType,
    setDestinationCity,
    setTripType,
    setTripInterest,
    setTripStyle,
  };
};

export default useSurvey;

const toggleButtonList = (list: string[], value: string) => {
  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  } else {
    return [...list, value];
  }
};
