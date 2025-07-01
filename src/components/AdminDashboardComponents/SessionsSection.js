import React, { useEffect, useState } from "react";
import AllSessionsTable from "./AllSessionsTable";
import { fetchFilteredSessions } from "../../services/sessionService";
import { useErrorContext } from "../../context/errorContext";
import SessionFilterSection from "./SessionFilterSection";
import Pagination from "../SharedComponents/Pagination";
import Modal from "../SharedComponents/Modal";
import CreateSessionModal from "./CreateSessionModal";

const SessionsSection = ({ sessions }) => {
  // Error context
  const { setError } = useErrorContext();

  // Modal control
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] =
    useState(false);

  const [allSessions, setAllSessions] = useState(sessions?.sessions || []);
  const [totalPages, setTotalPages] = useState(50);
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

  return (
    <div
      style={{
        direction: "rtl",
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
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
        <button
          onClick={() => {
            setIsCreateSessionModalOpen(true);
          }}
        >
          יצירת אימון חדש
        </button>
        <AllSessionsTable sessions={allSessions} setSessions={setAllSessions} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
        {/* Modal for creating a new session */}
        <CreateSessionModal
          isOpen={isCreateSessionModalOpen}
          onClose={() => {
            setIsCreateSessionModalOpen(false);
          }}
        ></CreateSessionModal>
      </div>
    </div>
  );
};

export default SessionsSection;
