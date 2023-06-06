import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import RequestMain from "../components/requests/RequestMain";

const ResquestScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <RequestMain />
      </main>
    </>
  );
};

export default ResquestScreen;
