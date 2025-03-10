import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import Header from "../components/Header/Header";
import { AuthProvider, useAuth } from "../context/AuthContext";


const App: React.FC = () => {
  const { username } = useAuth();
  return (
    <>
      <Header username={username || ''} />
      <AppRoutes />
    </>

  );
};

export default App;
