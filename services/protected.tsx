// protected.tsx (your protected page)

import React from "react";
import withAuth from "../services/withAuth"; // Adjust path as needed

const ProtectedPage: React.FC = () => {
  return <h1>This is a protected page. Only visible if signed in.</h1>;
};

export default withAuth(ProtectedPage);
