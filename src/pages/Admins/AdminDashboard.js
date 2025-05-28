import React, { useState } from "react";
import useAdminPageLogic from "../../hooks/AdminsHooks/useAdminPageLogic";

const AdminDashboard = () => {
  const { allSessions } = useAdminPageLogic();
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (participants) => {
    setSelectedParticipants(participants || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParticipants([]);
  };

  const handleEdit = (sessionId) => {
    alert(`עריכת מפגש ${sessionId}`);
  };

  const handleDelete = (sessionId) => {
    const confirm = window.confirm("האם אתה בטוח שברצונך למחוק את המפגש?");
    if (confirm) {
      alert(`מחיקת מפגש ${sessionId}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>ניהול מפגשים</h1>
        <button style={styles.createButton}>+ יצירת אימון חדש</button>
      </div>

      {allSessions?.length > 0 ? (
        allSessions.map((session) => {
          const {
            _id,
            date,
            time,
            type,
            location,
            status,
            participants,
            maxParticipants,
            notes,
          } = session;

          const formattedDate = new Date(date).toLocaleDateString("he-IL", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });

          return (
            <div key={_id} style={styles.card}>
              <div style={styles.statusTag}>{status}</div>

              <div style={styles.topRow}>
                <div style={styles.titleText}>{type}</div>
                <div
                  style={styles.timeText}
                >{`${time} | ${formattedDate}`}</div>
              </div>

              <div style={styles.detail}>
                <strong>מיקום:</strong> {location}
              </div>
              <div style={styles.detail}>
                <strong>משתתפים:</strong>{" "}
                <button
                  onClick={() => openModal(participants)}
                  style={styles.viewButton}
                >
                  {participants?.length || 0}/{maxParticipants}
                </button>
              </div>

              {notes && (
                <div style={styles.notes}>
                  <strong>הערה:</strong> {notes}
                </div>
              )}

              <div style={styles.actions}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(_id)}
                >
                  עריכה
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(_id)}
                >
                  מחיקה
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p style={styles.noSessions}>אין אימונים להצגה כרגע.</p>
      )}

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>משתתפים</h2>
            <ul style={styles.participantList}>
              {selectedParticipants.length > 0 ? (
                selectedParticipants.map((p, idx) => (
                  <li key={idx} style={styles.participantItem}>
                    {typeof p === "string"
                      ? p
                      : p?.fullName || "משתמש לא מזוהה"}
                  </li>
                ))
              ) : (
                <p>אין משתתפים רשומים.</p>
              )}
            </ul>
            <button style={styles.closeModal} onClick={closeModal}>
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "24px",
    backgroundColor: "#fdfdfd",
    minHeight: "100vh",
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
    direction: "rtl",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "1.8rem",
    color: "#2e2e2e",
  },
  createButton: {
    backgroundColor: "#2a9d8f",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    marginBottom: "16px",
    position: "relative",
  },
  statusTag: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#f4a261",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  topRow: {
    marginBottom: "8px",
  },
  titleText: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#2e2e2e",
    marginBottom: "4px",
  },
  timeText: {
    fontSize: "0.95rem",
    color: "#6c6c6c",
  },
  detail: {
    fontSize: "0.95rem",
    marginTop: "4px",
    color: "#444",
  },
  notes: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#fef1e9",
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },
  editButton: {
    backgroundColor: "#ffdd57",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  viewButton: {
    background: "none",
    color: "#00796b",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  noSessions: {
    fontSize: "1.1rem",
    color: "#999",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    fontSize: "1.4rem",
    marginBottom: "16px",
  },
  participantList: {
    listStyle: "none",
    padding: 0,
    marginBottom: "16px",
  },
  participantItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  closeModal: {
    backgroundColor: "#2a9d8f",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
