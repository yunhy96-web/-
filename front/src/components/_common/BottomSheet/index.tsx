import React from "react";
import * as Style from "./style";
import { shareKakao } from "../../../utils/shareKakaoLink";
import { Icon } from "../../../assets";
import { copyInvitationLink } from "../../../utils/copyInvitationLink";

type Props = {
  onClose: () => void;
  id: number;
  title: string;
  desc: string;
};

const BottomSheet = ({ onClose, id, title, desc }: Props) => {
  return (
    <>
      <Style.Overlay onClick={onClose} />
      <Style.BottomSheet>
        <Style.BottomSheetTitle>여행 일정 공유하기</Style.BottomSheetTitle>
        <Style.BottomSheetButtonBox>
          <Style.BottomSheetButton
            onClick={() =>
              shareKakao(
                `http://localhost:3000/mySchedule/detail/${id}`,
                title,
                desc
              )
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
  );
};

export default BottomSheet;
