import React, { useState } from "react";
import { FiUsers, FiEdit, FiPlus, FiTrash2, FiInfo } from "react-icons/fi";
import {
  registerUserToSession,
  unregisterFromSelectedSession,
} from "../../services/sessionService";
import { useErrorContext } from "../../context/errorContext";
import { toast } from "react-toastify";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";
import Modal from "../SharedComponents/Modal";
import EditSessionModal from "./EditSessionModal";
import AddUserToSessionModal from "./AddUserToSessionModal";

const AllSessionsTable = ({ sessions }) => {
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [infoExpandedId, setInfoExpandedId] = useState(null);

  const [editingSession, setEditingSession] = useState(null);
  const [addingUserSessionId, setAddingUserSessionId] = useState(null);

  // Error context
  const { setError } = useErrorContext();

  // Admin handler functions
  const {
    handleRegisterUserToSession,
    handleUnregisterUserFromSession,
    loading,
  } = useAdminHandler();

  const toggleExpand = (id) => {
    setExpandedSessionId((prev) => (prev === id ? null : id));
  };

  const toggleInfoExpand = (id) => {
    setInfoExpandedId((prev) => (prev === id ? null : id));
  };

  const getRowBackground = (session) => {
    const isFull = session.participants?.length >= session.maxParticipants;
    const isAvailable = session.status === "מתוכנן";
    return isAvailable ? (isFull ? "#ffe4e6" : "#ecfdf5") : "#f8fafc";
  };

  const getIconBtnStyle = {
    backgroundColor: "#e0f2fe",
    border: "1px solid #bae6fd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "6px 10px",
    color: "#0369a1",
    transition: "0.2s ease",
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableContainer}>
        <div style={styles.responsiveTableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th>תאריך</th>
                <th>סוג</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {sessions?.map((session) => {
                const isFull =
                  session.participants?.length >= session.maxParticipants;
                return (
                  <React.Fragment key={session._id}>
                    <tr
                      style={{
                        ...styles.row,
                        backgroundColor: getRowBackground(session),
                      }}
                    >
                      <td style={styles.cell}>
                        {new Date(session.date).toLocaleDateString("he-IL", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </td>
                      <td style={styles.cell}>{session.type}</td>
                      <td style={styles.cell}>
                        <span style={styles.statusBadge(session.status)}>
                          {session.status}
                        </span>
                      </td>
                      <td style={styles.cell}>
                        <div style={styles.actions}>
                          <button
                            style={getIconBtnStyle}
                            onClick={() => setEditingSession(session)}
                          >
                            <FiEdit />
                          </button>

                          <button
                            style={getIconBtnStyle}
                            onClick={() => toggleExpand(session._id)}
                          >
                            <FiUsers />
                          </button>
                          <button
                            style={getIconBtnStyle}
                            onClick={() => toggleInfoExpand(session._id)}
                          >
                            <FiInfo />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {infoExpandedId === session._id && (
                      <tr>
                        <td colSpan="4" style={styles.expandBox}>
                          <div style={styles.infoLine}>
                            <strong>שעה:</strong> {session.time}
                          </div>
                          <div style={styles.infoLine}>
                            <strong>מיקום:</strong> {session.location}
                          </div>
                          <div style={styles.infoLine}>
                            <strong>הערות:</strong> {session.notes}
                          </div>
                        </td>
                      </tr>
                    )}
                    {expandedSessionId === session._id && (
                      <tr>
                        <td colSpan="4" style={styles.expandBox}>
                          <div style={styles.infoLine}>
                            <strong>משתתפים:</strong>{" "}
                            {session.participants?.length || 0} מתוך{" "}
                            {session.maxParticipants}
                          </div>
                          <div style={styles.participantsList}>
                            {session.participants?.length > 0 ? (
                              session.participants.map((p, i) => (
                                <div key={i} style={styles.participantCard}>
                                  <div>
                                    <strong>שם מלא:</strong> {p.fullName || "—"}
                                  </div>
                                  <div>
                                    <strong>שם משתמש:</strong> {p.username}
                                  </div>
                                  <div>
                                    <strong>אימייל:</strong> {p.email}
                                  </div>
                                  <button
                                    style={styles.removeBtn}
                                    onClick={() =>
                                      handleUnregisterUserFromSession(
                                        session._id,
                                        p._id
                                      )
                                    }
                                  >
                                    <FiTrash2 /> הסר
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div style={styles.noParticipants}>
                                אין משתתפים
                              </div>
                            )}
                            <button
                              style={styles.addBtn}
                              onClick={() =>
                                setAddingUserSessionId(session._id)
                              }
                            >
                              <FiPlus /> הוסף משתתף
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Editing Session */}
      <EditSessionModal
        session={editingSession}
        isOpen={!!editingSession}
        onClose={() => setEditingSession(null)}
      />

      {/* Modal for Adding User to Session */}
      <AddUserToSessionModal
        sessionId={addingUserSessionId}
        isOpen={!!addingUserSessionId}
        onClose={() => setAddingUserSessionId(null)}
      />
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "1rem 0.5rem",
    fontFamily: '"M PLUS Rounded 1c", sans-serif',
    backgroundColor: "#f9fafb",
  },
  tableContainer: {
    width: "100%",
  },
  responsiveTableWrapper: {
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    maxWidth: "100vw",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#1e293b",
    textAlign: "center",
  },
  table: {
    width: "100%",
    minWidth: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px",
    direction: "rtl",
    fontSize: "0.95rem",
  },
  headerRow: {
    backgroundColor: "#f1f5f9",
    height: "44px",
  },
  row: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    height: "64px",
    transition: "all 0.2s ease",
  },
  cell: {
    verticalAlign: "middle",
    padding: "0.4rem 0.5rem",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtn: {
    backgroundColor: "#e2e8f0",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "5px 8px",
    color: "#1e293b",
    transition: "background-color 0.2s ease",
  },
  statusBadge: (status) => ({
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "600",
    backgroundColor:
      status === "מתוכנן"
        ? "#fef08a"
        : status === "הושלם"
        ? "#bbf7d0"
        : "#fecaca",
    color:
      status === "מתוכנן"
        ? "#92400e"
        : status === "הושלם"
        ? "#166534"
        : "#991b1b",
  }),
  expandBox: {
    backgroundColor: "#f1f5f9",
    padding: "1rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "0 0 10px 10px",
    textAlign: "right",
  },
  infoLine: {
    marginBottom: "0.4rem",
    color: "#334155",
  },
  participantsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "0.75rem",
  },
  participantCard: {
    backgroundColor: "#fff",
    padding: "0.65rem 0.85rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  removeBtn: {
    marginTop: "0.4rem",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.65rem",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  addBtn: {
    alignSelf: "start",
    backgroundColor: "#d1fae5",
    color: "#166534",
    border: "none",
    borderRadius: "6px",
    padding: "0.55rem 1rem",
    fontWeight: "600",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  noParticipants: {
    color: "#64748b",
    fontStyle: "italic",
    fontSize: "0.8rem",
  },
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
  textarea: {
    padding: "0.65rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    resize: "vertical",
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

export default AllSessionsTable;
