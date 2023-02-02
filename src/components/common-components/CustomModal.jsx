import Modal from "antd/es/modal/Modal";

const CustomModal = (props) => {
  const { open, hideModal, action, title } = props;

  return (
    <Modal
      title="Modal"
      open={open}
      onOk={action}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};
export default CustomModal;
