import { useState, useEffect } from "react";
import useAllSessionsFromDB from "./useAllSessionsFromDB";
import useAllUsersFromDB from "./useAllUsersFromDB";

const useAdminPageLogic = () => {
  const { data: allSessions, loading: loadingSessions } =
    useAllSessionsFromDB();
  const { users: allUsers, loading: loadingUsers } = useAllUsersFromDB();

  useEffect(() => {
    console.log(allSessions);
  }, [allSessions]);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  return {
    allSessions: allSessions,
    allUsers: allUsers,
    loading: loadingSessions || loadingUsers,
  };
};

export default useAdminPageLogic;
