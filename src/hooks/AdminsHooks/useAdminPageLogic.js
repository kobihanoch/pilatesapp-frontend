import { useState, useEffect } from "react";
import useAllSessionsFromDB from "./useAllSessionsFromDB";

const useAdminPageLogic = () => {
  const { data: allSessions } = useAllSessionsFromDB();

  useEffect(() => {
    console.log(allSessions);
  }, [allSessions]);

  return { allSessions };
};

export default useAdminPageLogic;
