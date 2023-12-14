import React, { useState } from "react";
import { PeriodTag } from "../_common/Tag/PeriodTab";
import dayjs from "dayjs";
import * as Style from "./styles";
import useConfirmModal from "../../hooks/useConfirmModal";
import { Icon } from "../../assets";
import { shareKakao } from "../../utils/shareKakaoLink";
import { copyInvitationLink } from "../../utils/copyInvitationLink";

type Props = {
  startDate: string;
  endDate: string;
  title: string;
  id: number;
  openDropdown: () => void;
  isOpenDropdown: boolean;
};

const MyScheduleCard = ({
  id,
  startDate,
  endDate,
  title,
  openDropdown,
  isOpenDropdown,
}: Props) => {
  const period = dayjs(endDate).diff(dayjs(startDate), "day") + 1;

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  return (
    <>
      <Style.Card>
        <Style.CardLeft>
          <PeriodTag>
            {period}박 {period + 1}일
          </PeriodTag>
          <Style.CardTitle>{title}</Style.CardTitle>
          <div>{`${startDate} ~ ${endDate}`}</div>
        </Style.CardLeft>
        <Style.DropdownBox>
          <Style.CircleButton onClick={openDropdown}>
            <Style.Circle />
            <Style.Circle />
            <Style.Circle />
          </Style.CircleButton>
          {isOpenDropdown ? (
            <Style.Dropdown>
              <Style.DropdownItem
                onClick={() => {
                  setOpenBottomSheet(true);
                }}
              >
                공유
              </Style.DropdownItem>
              <Style.DropdownItem>수정</Style.DropdownItem>
              <Style.DropdownItem
                onClick={() => {
                  openConfirmModal({
                    type: "DELETE",
                    confirm: () => {},
                    cancel: () => {},
                  });
                }}
              >
                삭제
              </Style.DropdownItem>
            </Style.Dropdown>
          ) : null}
        </Style.DropdownBox>
      </Style.Card>
      {isOpenDropdown && openBottomSheet && (
        <>
          <Style.Overlay onClick={() => setOpenBottomSheet(false)} />
          <Style.BottomSheet>
            <Style.BottomSheetTitle>여행 일정 공유하기</Style.BottomSheetTitle>
            <Style.BottomSheetButtonBox>
              <Style.BottomSheetButton
                onClick={() =>
                  shareKakao("http://localhost:3000", "여행일정공유")
                }
              >
                <Icon.Kakao />
                <div>카카오톡</div>
              </Style.BottomSheetButton>
              <Style.BottomSheetButton
                onClick={() => {
                  copyInvitationLink(id);
                }}
              >
                <Icon.Url />
                <div>URL 복사</div>
              </Style.BottomSheetButton>
            </Style.BottomSheetButtonBox>
          </Style.BottomSheet>
        </>
      )}
    </>
  );
};

export default MyScheduleCard;
