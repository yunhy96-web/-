import Button from "../Button";
import Modal from "../Modal";
import { ConfirmModalType, CONFIRM_MODAL } from "../../../constants/Confirm";
import * as Style from "./styels";
import { useRecoilState } from "recoil";
import {
  confirmModalState,
  initialConfirmModalState,
} from "../../../atom/confirmModalState";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { Icon } from "../../../assets";

interface Props {
  modalHandler: () => void;
  width?: string;
  cancel?: () => void;
  confirm: (() => Promise<void>) | (() => void);
  flexDirection?: "row" | "column";
  id?: string;
  type: ConfirmModalType;
}

export const ConfirmModal = ({
  modalHandler,
  cancel,
  confirm,
  flexDirection = "row",
  width = "448px",
  id,
  type,
}: Props) => {
  const hasCancelProperty =
    cancel && CONFIRM_MODAL[type].hasOwnProperty("cancel");
  const { closeConfirmModal } = useConfirmModal();
  // const deviceWidth = isMobile ? '328px' : width;

  const closeModalAfterSuccessConfirm = async () => {
    await confirm();
    closeConfirmModal();
  };

  return (
    <Modal.Frame borderRadius="8px" onClick={modalHandler}>
      {type === "COMPLETE" && (
        <Modal.Header>
          <Style.Title>
            <Icon.Complete></Icon.Complete>
          </Style.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        <Style.Desc>{CONFIRM_MODAL[type].description}</Style.Desc>
      </Modal.Body>
      <Modal.Footer flexDirection={flexDirection}>
        {hasCancelProperty ? (
          <>
            <Button color="gray" text={"취소"} onClick={cancel} />
            <Button
              width="100%"
              // color={hasCancelProperty ? "black" : "white"}
              onClick={closeModalAfterSuccessConfirm}
              text={CONFIRM_MODAL[type].confirm}
            />
          </>
        ) : (
          <Button
            color="gray"
            text={CONFIRM_MODAL[type].confirm}
            onClick={closeConfirmModal}
          />
        )}
      </Modal.Footer>
    </Modal.Frame>
  );
};

export const GlobalConfirmModal = () => {
  const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);

  const modalHandler = () => {
    setConfirmModal(initialConfirmModalState);
  };

  const renderer = () => {
    if (confirmModal.type === null) {
      return null;
    }

    return (
      <ConfirmModal
        id={confirmModal.id || ""}
        modalHandler={modalHandler}
        cancel={confirmModal.cancel}
        type={confirmModal.type}
        confirm={confirmModal.confirm}
      />
    );
  };

  return <>{renderer()}</>;
};
