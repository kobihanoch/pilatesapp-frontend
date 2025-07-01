import React from "react";
import Modal from "../SharedComponents/Modal";

const CreateSessionModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1>יצירת אימון חדש</h1>
      </div>
    </Modal>
  );
};

export default CreateSessionModal;
