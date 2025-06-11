// AddUserToSessionModal.js
import React, { useState } from "react";
import Modal from "../SharedComponents/Modal";

const AddUserToSessionModal = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleAdd = () => {
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>הוספת משתמש</h2>
      <div style={styles.formGroup}>
        <label>שם משתמש:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="שם משתמש"
          style={styles.input}
        />
      </div>
      <button style={styles.submitBtn} onClick={handleAdd}>
        הוסף
      </button>
    </Modal>
  );
};

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
  },
  submitBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background 0.2s ease",
  },
};

export default AddUserToSessionModal;
