import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    const delta = 2;

    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        margin: "2rem 0 5rem",
      }}
    >
      {getPages().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              style={{ padding: "0.5rem", color: "#9ca3af" }}
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              backgroundColor: page === currentPage ? "#2563eb" : "#ffffff",
              color: page === currentPage ? "#ffffff" : "#111827",
              cursor: "pointer",
              minWidth: "2.5rem",
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
