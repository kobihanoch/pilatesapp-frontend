import React from "react";

const UserFilterSection = ({
  search,
  handleSearchChange,
  sortField,
  handleSortFieldChange,
  sortOrder,
  handleSortOrderChange,
}) => {
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        margin: "1rem",
      }}
    >
      <div style={{ width: "100%" }}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="חיפוש לפי שם, מייל, תפקיד או מגדר..."
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "0.95rem",
            width: "100%",
            backgroundColor: "#f9fafb",
            boxSizing: "border-box",
            display: "block",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <select
          value={sortField}
          onChange={handleSortFieldChange}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "0.95rem",
            width: "100%",
            maxWidth: "480px",
            backgroundColor: "#f9fafb",
            color: "#111827",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 1rem center",
            backgroundSize: "1rem",
            paddingLeft: "2.5rem",
          }}
        >
          <option value="username">שם משתמש</option>
          <option value="fullName">שם מלא</option>
          <option value="email">אימייל</option>
          <option value="role">תפקיד</option>
          <option value="gender">מגדר</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "0.95rem",
            width: "100%",
            maxWidth: "480px",
            backgroundColor: "#f9fafb",
            color: "#111827",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 1rem center",
            backgroundSize: "1rem",
            paddingLeft: "2.5rem",
          }}
        >
          <option value="asc">סדר עולה</option>
          <option value="desc">סדר יורד</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilterSection;
