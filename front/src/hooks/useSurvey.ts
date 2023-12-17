import { useRecoilState } from "recoil";
import { initialSurvey, surveyState } from "../atom/surveyState";
import dayjs from "dayjs";

const useSurvey = () => {
  const [survey, setSurvey] = useRecoilState(surveyState);

  const initSurvey = () => {
    setSurvey(initialSurvey.default);
  };

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

  const getTripPeriod = () => {
    const tripPeriod = dayjs(survey.endDate.format("YYYY-MM-DD")).diff(
      survey.startDate.format("YYYY-MM-DD"),
      "day"
    );

    return tripPeriod;
  };

  return {
    survey,
    setSurvey,
    setDestinationType,
    setDestinationCity,
    setTripType,
    setTripInterest,
    setTripStyle,
    getTripPeriod,
    initSurvey,
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
