import React, { useEffect, useRef, useState } from "react";
import { PeriodTag } from "../_common/Tag/PeriodTab";
import dayjs from "dayjs";
import * as Style from "./styles";
import useConfirmModal from "../../hooks/useConfirmModal";
import { Icon } from "../../assets";
import { shareKakao } from "../../utils/shareKakaoLink";
import { copyInvitationLink } from "../../utils/copyInvitationLink";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../_common/BottomSheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchedule } from "../../api/clova";

type Props = {
  startDate: string;
  endDate: string;
  title: string;
  id: number;
  groupId: number;
  openDropdown: () => void;
  isOpenDropdown: boolean;
  onClose: () => void;
};

const MyScheduleCard = ({
  id,
  startDate,
  endDate,
  title,
  openDropdown,
  isOpenDropdown,
  onClose,
  groupId,
}: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const period = dayjs(endDate).diff(dayjs(startDate), "day") + 1;

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { mutate } = useMutation({
    mutationKey: ["deleteSchedule"],
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mySchedule", "all"] });
    },
  });

  // useEffect(() => {
  //   const onClickOutSide = (event: MouseEvent) => {
  //     if (ref?.current && !ref.current.contains(event.target as Node)) {
  //       onClose();
  //     }
  //   };
  //   document.addEventListener("mousedown", onClickOutSide);
  //   return () => {
  //     document.removeEventListener("mousedown", onClickOutSide);
  //   };
  // }, [ref.current]);

  return (
    <>
      <Style.Card
        onClick={(e) => {
          navigate(`/mySchedule/detail/${id}`);
        }}
      >
        <Style.CardLeft>
          <PeriodTag>
            {period}박 {period + 1}일
          </PeriodTag>
          <Style.CardTitle>{title}</Style.CardTitle>
          <Style.DateTitle>{`${startDate} ~ ${endDate}`}</Style.DateTitle>
        </Style.CardLeft>
        <Style.DropdownBox ref={ref}>
          <Style.CircleButton
            onClick={(e) => {
              e.stopPropagation();
              openDropdown();
            }}
          >
            <Style.Circle />
            <Style.Circle />
            <Style.Circle />
          </Style.CircleButton>
          {isOpenDropdown ? (
            <Style.Dropdown>
              <Style.DropdownItem
                onClick={(e) => {
                  e.stopPropagation();

                  setOpenBottomSheet(true);
                }}
              >
                공유
              </Style.DropdownItem>
              <Style.DropdownItem
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/mySchedule/detail/${id}`);
                }}
              >
                수정
              </Style.DropdownItem>
              <Style.DropdownItem
                onClick={(e) => {
                  e.stopPropagation();
                  openConfirmModal({
                    type: "DELETE",
                    confirm: () => mutate(groupId),
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
        <BottomSheet
          title={`${title} ${period}박 ${period + 1}일`}
          onClose={() => setOpenBottomSheet(false)}
          desc={`${startDate} ~ ${endDate}`}
          id={id}
        />
      )}
    </>
  );
};

export default MyScheduleCard;
