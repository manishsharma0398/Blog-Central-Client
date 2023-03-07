import Modal from "antd/es/modal/Modal";

const CustomModal = ({ open, hideModal, action, title, text }) => {
  return (
    <Modal
      title={title || "Delete Blog"}
      open={open}
      onOk={action}
      onCancel={hideModal}
      okText="Yes"
      cancelText="No"
    >
      <p>{text || title}</p>
    </Modal>
  );
};
export default CustomModal;
