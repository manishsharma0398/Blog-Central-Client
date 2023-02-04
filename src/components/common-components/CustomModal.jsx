import Modal from "antd/es/modal/Modal";

const CustomModal = (props) => {
  const { open, hideModal, action, title } = props;

  return (
    <Modal
      title={title || "Delete Blog"}
      open={open}
      onOk={action}
      onCancel={hideModal}
      okText="Yes"
      cancelText="No"
    >
      <p>{title}</p>
    </Modal>
  );
};
export default CustomModal;
