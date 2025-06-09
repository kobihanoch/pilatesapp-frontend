import React, { useEffect, useState } from "react";
import AllSessionsTable from "./AllSessionsTable";
import { fetchFilteredSessions } from "../../services/sessionService";
import { useErrorContext } from "../../context/errorContext";
import SessionFilterSection from "./SessionFilterSection";

const SessionsSection = ({ sessions }) => {
  // Error context
  const { setError } = useErrorContext();

  const [allSessions, setAllSessions] = useState(sessions?.sessions || []);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          console.log("Create search");
          const data = await fetchFilteredSessions(
            currentPage,
            10,
            search,
            sortField,
            sortOrder
          );
          console.log("Fetched sessions:", data);
          setAllSessions(data.sessions || []);
          setTotalPages(data.totalPages || 1);
        } catch (e) {
          setError(e);
        }
      };
      fetchData();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, sortField, sortOrder, currentPage]);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            padding: "0.5rem 0.75rem",
            margin: "0 0.25rem",
            marginBottom: "5rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            backgroundColor: i === currentPage ? "#2563eb" : "#ffffff",
            color: i === currentPage ? "#ffffff" : "#111827",
            cursor: "pointer",
          }}
        >
          {i}
        </button>
      );
    }
    return (
      <div style={{ marginTop: "1rem", textAlign: "center" }}>{pages}</div>
    );
  };

  return (
    <div
      style={{
        direction: "rtl",
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
        backgroundColor: "#f9fafb",
      }}
    >
      <SessionFilterSection
        search={search}
        handleSearchChange={handleSearchChange}
        sortField={sortField}
        handleSortFieldChange={handleSortFieldChange}
        sortOrder={sortOrder}
        handleSortOrderChange={handleSortOrderChange}
      />

      <div style={{ width: "100%", height: "auto" }}>
        <AllSessionsTable sessions={allSessions} />
        {renderPagination()}
      </div>
    </div>
  );
};

export default SessionsSection;
