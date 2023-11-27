import React, { useEffect, useState } from "react";
import CommunitySection from "./communityPage";
import DoctorList from "./doctorList";
import DoctorRegistrationMessage from "./allocateDoctor";
import AllocateResource from "./allocateResource";
import AllocateMedicine from "./allocateMedicine";
import ManageSlots from "./manageSlots";

const Dashboard = () => {
  // State to store the user's role
  const [role, setRole] = useState("");

  // Effect to retrieve the user's role from local storage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <>
      <br />
      {role === "ADMIN" && (
        <>
          <CommunitySection />
          <br />
          <DoctorRegistrationMessage />
          <br />
          <AllocateResource />
          <br />
          <AllocateMedicine />
          <br />
        </>
      )}
      {role === "PATIENT" && (
        <>
          <CommunitySection />
          <br />
          <DoctorList />
          <br />
        </>
      )}
      {role === "DOCTOR" && (
        <>
          <CommunitySection />
          <br />
          <ManageSlots />
          <br />
        </>
      )}
    </>
  );
};

// Add additional components for Patient and Doctor roles as needed

export default Dashboard;
