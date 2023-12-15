import React, { useState } from "react";
import { PeriodTag } from "../_common/Tag/PeriodTab";
import dayjs from "dayjs";
import * as Style from "./styles";
import useConfirmModal from "../../hooks/useConfirmModal";
import { Icon } from "../../assets";
import { shareKakao } from "../../utils/shareKakaoLink";
import { copyInvitationLink } from "../../utils/copyInvitationLink";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../_common/BottomSheet";

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
  const navigate = useNavigate();
  const period = dayjs(endDate).diff(dayjs(startDate), "day") + 1;

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  return (
    <>
      <Style.Card onClick={() => navigate(`/mySchedule/detail/${id}`)}>
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
                    confirm: closeConfirmModal,
                    cancel: closeConfirmModal,
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
        <BottomSheet onClose={() => setOpenBottomSheet(false)} id={id} />
      )}
    </>
  );
};

export default MyScheduleCard;
