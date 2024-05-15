/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { ReactNode } from "react";
interface GuruModalProps {
  title: string;
  showModal: boolean;
  setShowModal: (props: any) => void;
  children: ReactNode;
}
const GuruModal = ({
  title,
  showModal,
  setShowModal,
  children,
}: GuruModalProps) => {
  const handleCloseModal = () => {
    setShowModal((prev: boolean) => !prev);
  };
  return (
    <Modal
      title={title}
      open={showModal}
      onCancel={handleCloseModal}
      okButtonProps={{ style: { visibility: "hidden" } }}
      cancelButtonProps={{ style: { visibility: "hidden" } }}
    >
      {children}
    </Modal>
  );
};

export default GuruModal;
