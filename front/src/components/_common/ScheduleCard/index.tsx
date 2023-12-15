import React, { useState } from "react";
import * as Style from "./style";
import { Icon } from "../../../assets";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  title: string;
  onDragStart: (e: any) => void;
  onDragEnter: (e: any) => void;
  onDragOver: (e: any) => void;
  onDragEnd: (e: any) => void;
  description: string;
  onChangeDescription: (value: string) => void;
  onChangeContent: (value: string) => void;
  onDelete: () => void;
  isEditable: boolean;
  id?: number;
  index?: number;
  moveItem?: (dragIndex: number, hoverIndex: number) => void;
};

const ScheduleCard = ({
  title,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDragStart,
  description,
  onChangeDescription,
  onChangeContent,
  onDelete,
  isEditable,
  id,
  index,
  moveItem,
}: Props) => {
  const [, drag] = useDrag({
    type: "ITEM",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveItem && moveItem(draggedItem.index, index || 0);
        draggedItem.index = index;
      }
    },
  });

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
      ref={(node) => {
        drag(drop(node));
      }}
      isOpen={open}
      // draggable={isGrab}
      // onDragStart={onDragStart}
      // onDragEnter={onDragEnter}
      // onDragOver={onDragOver}
      // onDragEnd={(e) => {
      //   onDragEnd(e);
      //   setIsGrab(false);
      // }}
    >
      <Style.Title>
        <Style.TitleLeft>
          <Style.DragButton
            isGrab={isGrab}
            onTouchStart={() => {
              setIsGrab(true);
            }}
            onTouchEnd={() => {
              setIsGrab(false);
            }}
            onMouseDown={() => {
              setIsGrab(true);
            }}
            onMouseUp={() => {
              setIsGrab(false);
            }}
          >
            <Icon.Hamburger />
          </Style.DragButton>
          {isEditable ? (
            <Style.TitleInput
              value={title}
              onChange={(e) => onChangeContent(e.target.value)}
            />
          ) : (
            <Style.TitleText>{title}</Style.TitleText>
          )}
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
