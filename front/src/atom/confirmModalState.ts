import { atom } from "recoil";
import { ConfirmModalType } from "../constants/Confirm";

export interface ConfirmModalState {
  type: ConfirmModalType | null;
  confirm: (() => Promise<void>) | (() => void);
  cancel?: () => void;
  id?: string;
}

export const initialConfirmModalState = {
  type: null,
  confirm: async () => {},
  cancel: () => {},
  id: "",
};

export const confirmModalState = atom<ConfirmModalState>({
  key: "confirmModalState",
  default: initialConfirmModalState,
});
