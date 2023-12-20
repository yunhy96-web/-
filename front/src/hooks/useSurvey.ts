import { useRecoilState } from "recoil";
import { initialSurvey, surveyState } from "../atom/surveyState";
import dayjs from "dayjs";
import { nestedUpdate, updateFieldByName } from "../utils";

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

  // const setTripType = (type: string) => {
  //   setSurvey((prev) =>
  //     updateFieldByName(
  //       prev,
  //       "trip",
  //       updateFieldByName(
  //         prev.trip,
  //         "type",
  //         toggleButtonList(prev.trip.type, type)
  //       )
  //     )
  //   );
  // };

  const setTripType = (type: string) => {
    setSurvey((prev) => {
      // return nestedUpdate(prev, ["trip", "type"], (value: any) => {
      //   console.log(value);
      //   return value;
      // });
      return updateFieldByName(
        prev,
        "trip",
        updateFieldByName(
          prev.trip,
          "type",
          toggleButtonList(prev.trip.type, type)
        )
      );
    });
  };

  const setTripInterest = (interest: string) => {
    setSurvey((prev) =>
      updateFieldByName(
        prev,
        "trip",
        updateFieldByName(
          prev.trip,
          "interest",
          toggleButtonList(prev.trip.interest, interest)
        )
      )
    );
  };

  const setTripStyle = (style: string) => {
    setSurvey((prev) =>
      updateFieldByName(
        prev,
        "trip",
        updateFieldByName(prev.trip, "style", style)
      )
    );
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
