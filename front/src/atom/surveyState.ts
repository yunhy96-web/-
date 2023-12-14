import dayjs, { Dayjs } from "dayjs";
import { atom } from "recoil";

type SurveyState = {
  startDate: Dayjs;
  endDate: Dayjs;
  destination: {
    type: string;
    city: string;
  };
  trip: {
    type: string[];
    interest: string[];
    style: string;
  };
  addedDestination: string;
};

export const surveyState = atom<SurveyState>({
  key: "surveyState",
  default: {
    startDate: dayjs(),
    endDate: dayjs().add(2, "day"),
    destination: {
      type: "",
      city: "",
    },
    addedDestination: "",
    trip: {
      type: [],
      interest: [],
      style: "",
    },
  },
});
