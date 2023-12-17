import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const authState = atom<string>({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
