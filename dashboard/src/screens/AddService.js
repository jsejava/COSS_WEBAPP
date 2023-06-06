import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddServiceMain from "../components/services/AddServiceMain";

const AddService = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddServiceMain />
      </main>
    </>
  );
};

export default AddService;
