import { api } from ".";

type TripContent = {
  content1: string;
  content2: string;
  content3: string;
};
export const createTripSchedule = async (content: TripContent) => {
  const { data } = await api.post("/clova/send-request2", content);
  return data;
};

export const getTripSchedule = async () => {
  const { data } = await api.get("/plans");
  return data;
};
