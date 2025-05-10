import React, { useState, useEffect } from "react";
import AvailableSessionItem from "./SignUpSectionListComponents/AvailableSessionItem";

const SignupSection = ({ availableSessions }) => {
  useEffect(() => {
    if (availableSessions) console.log(availableSessions);
  }, [availableSessions]);
  return (
    <div style={{ backgroundColor: "green" }}>
      {availableSessions?.map((session) => (
        <AvailableSessionItem
          key={session._id}
          session={session}
        ></AvailableSessionItem>
      ))}
    </div>
  );
};

export default SignupSection;
