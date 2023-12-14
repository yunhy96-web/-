import React, { useState } from "react";
import * as Style from "./style";
import { Icon } from "../../../assets";
import useConfirmModal from "../../../hooks/useConfirmModal";

type Props = {
  title: string;
  onDragStart: (e: any) => void;
  onDragEnter: (e: any) => void;
  onDragOver: (e: any) => void;
  onDragEnd: (e: any) => void;
  description: string;
  onChangeDescription: (value: string) => void;
  onDelete: () => void;
};

const ScheduleCard = ({
  title,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDragStart,
  description,
  onChangeDescription,
  onDelete,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isGrab, setIsGrab] = useState(false);

  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const deleteSchedule = () => {
    openConfirmModal({
      type: "DELETE_WHEN_EDITING",
      confirm: onDelete,
      cancel: closeConfirmModal,
    });
  };

  return (
    <Style.Card
      isOpen={open}
      draggable={isGrab}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragEnd={(e) => {
        onDragEnd(e);
        setIsGrab(false);
      }}
    >
      <Style.Title>
        <Style.TitleLeft>
          <Style.DragButton
            isGrab={isGrab}
            onTouchStart={() => {}}
            onMouseDown={() => {
              setIsGrab(true);
            }}
            onMouseUp={() => {
              setIsGrab(false);
            }}
          >
            <Icon.Hamburger />
          </Style.DragButton>
          <Style.TitleText>{title}</Style.TitleText>
          {/* <button>
            <Icon.Reload />
          </button> */}
        </Style.TitleLeft>
        <Style.TitleRight>
          <Style.Arrow isOpen={open} onClick={() => setOpen((prev) => !prev)}>
            <Icon.RightArrow />
          </Style.Arrow>
          <div onClick={deleteSchedule}>
            <Icon.Close />
          </div>
        </Style.TitleRight>
      </Style.Title>
      <Style.Detail
        isOpen={open}
        placeholder="세부적인 여행계획을 작성해보세요."
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </Style.Card>
  );
};

export default React.memo(ScheduleCard);
