export type ConfirmModalType = keyof typeof CONFIRM_MODAL;

export const CONFIRM_MODAL = {
  DELETE_WHEN_EDITING: {
    title: "",
    description: `여행지를 삭제하시면 입력하신\n세부 계획도 삭제됩니다.\n삭제 후 되돌릴 수 없습니다.\n삭제하시겠습니까?`,
    cancel: "취소",
    confirm: "삭제",
  },
  EIXT_WHEN_EDITING: {
    title: "",
    description:
      "화면을 나가시면 그동안\n수정했던 내용이 저장되지 않습니다.\n이동하시겠습니까?",
    cancel: "취소",
    confirm: "삭제",
  },
  DELETE: {
    title: "",
    description: "일정을 삭제하시겠습니까?\n삭제 후 되돌릴 수 없습니다.",
    cancel: "취소",
    confirm: "삭제",
  },
  LIMIT_SCHEDULE: {
    title: "",
    description: `여행지는 20개까지만 추가 가능합니다.`,
    // cancel: "취소",
    confirm: "확인",
  },
  INIT_SCHEDULE: {
    title: "",
    description: `처음에 추천받았던 여행지로 되돌아갑니다.\n지금까지 수정된 내용은 저장되지 않습니다.\n초기화 하시겠습니까?`,
    cancel: "취소",
    confirm: "초기화",
  },
  COMPLETE: {
    title: "",
    description: `여행 일정이 저장되었습니다!\n일정 관리에서 확인가능합니다.`,
    cancel: "닫기",
    confirm: "일정 관리",
  },
};
