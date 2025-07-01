import React, { useState } from "react";
import { FiEdit, FiTrash2, FiInfo } from "react-icons/fi";
import EditUserModal from "./EditUserModal";
import useAdminHandler from "../../hooks/AdminsHooks/useAdminHandler";

const AllUsersTable = ({ users, setUsers }) => {
  const [infoExpandedId, setInfoExpandedId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const { handleDeleteUser } = useAdminHandler();

  const toggleInfoExpand = (id) => {
    setInfoExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableContainer}>
        <div style={styles.responsiveTableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th>שם מלא</th>
                <th>שם משתמש</th>
                <th>תפקיד</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <React.Fragment key={user._id}>
                  <tr style={styles.row}>
                    <td style={styles.cell}>{user.fullName}</td>
                    <td style={styles.cell}>{user.username}</td>
                    <td style={styles.cell}>
                      <span style={styles.roleBadge(user.role)}>
                        {user.role === "admin" ? "מנהל" : "משתמש"}
                      </span>
                    </td>
                    <td style={styles.cell}>
                      <div style={styles.actions}>
                        <button
                          style={styles.iconBtn}
                          onClick={() => setEditingUser(user)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          style={styles.iconBtn}
                          onClick={() => {
                            const confirmed = window.confirm(
                              "האם אתה בטוח שברצונך למחוק את המשתמש?"
                            );
                            if (confirmed) handleDeleteUser(user._id);
                          }}
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          style={styles.iconBtn}
                          onClick={() => toggleInfoExpand(user._id)}
                        >
                          <FiInfo />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {infoExpandedId === user._id && (
                    <tr>
                      <td colSpan="4" style={styles.expandBox}>
                        <div style={styles.infoLine}>
                          <strong>אימייל:</strong> {user.email}
                        </div>
                        <div style={styles.infoLine}>
                          <strong>תאריך לידה:</strong>{" "}
                          {new Date(user.birthDate).toLocaleDateString("he-IL")}
                        </div>
                        <div style={styles.infoLine}>
                          <strong>מין:</strong>{" "}
                          {user.gender === "male"
                            ? "זכר"
                            : user.gender === "female"
                            ? "נקבה"
                            : "אחר"}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for Editing User */}
      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        setUsers={setUsers}
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
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    height: "64px",
    transition: "all 0.2s ease",
    textAlign: "center",
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
    backgroundColor: "#e0f2fe",
    border: "1px solid #bae6fd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "6px 10px",
    color: "#0369a1",
    transition: "0.2s ease",
  },
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
  roleBadge: (role) => ({
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "600",
    backgroundColor: role === "admin" ? "#dbeafe" : "#f3f4f6",
    color: role === "admin" ? "#1d4ed8" : "#374151",
    display: "inline-block",
  }),
};

export default AllUsersTable;
