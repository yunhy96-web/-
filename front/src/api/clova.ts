import { api } from ".";

type TripContent = {
  content: string;
  content2: string;
  content3: string;
};
export const createTripSchedule = async (content: TripContent) => {
  const { data } = await api.post("/clova/send-request2", content);
  return data;
};
