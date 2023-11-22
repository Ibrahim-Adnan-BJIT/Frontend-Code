import React from "react";

import Navbar from "./header";
import MyNavbar from "./patientNavbar";

const MainComponent = () => {
  // Retrieve token from local storage
  const token = localStorage.getItem("token"); // Replace 'yourTokenKey' with your actual token key

  // Retrieve role from local storage or your authentication logic
  const role = localStorage.getItem("role"); // Replace 'yourRoleKey' with your actual role key

  // Check if token is empty
  if (!token) {
    return <Navbar />;
  }

  // Check the role and render the corresponding Navbar
  if (role === "PATIENT") {
    return <MyNavbar />;
  } else if (role === "ADMIN") {
    return <MyNavbar />;
  } else if (role === "DOCTOR") {
    return <MyNavbar />;
  } else {
    // Default case (you can handle other roles as needed)
    return <Navbar />;
  }
};

export default MainComponent;
