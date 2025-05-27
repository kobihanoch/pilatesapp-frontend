import React from "react";
import TopBar from "../components/HomeComponents/TopBar";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
