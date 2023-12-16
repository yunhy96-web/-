import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "accessToken",
});

export const authState = atom({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
