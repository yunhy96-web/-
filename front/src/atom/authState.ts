import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "accessToken",
});

export const authState = atom({
  key: "accessToken",
  default:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjEyMTQxLCJleHAiOjE3MDI2MTU3NDF9.ZJFvC3X7TVm_RBz7-3zaughBWSUSME_B282rid6g3Zo",
  effects_UNSTABLE: [persistAtom],
});
