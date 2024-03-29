import React from "react";
import "./App.css";


import NavBar from "./components/NavBar";
import PagesRoutes from "./routes/PagesRoutes";

const App = () => {
  return (
    <>
      <div className=" min-h-screen">
        <NavBar />
        <PagesRoutes/>
      </div>
    </>
  );
};

export default App;
