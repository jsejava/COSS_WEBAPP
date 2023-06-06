import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import MainProducts from "../components/products/MainProducts";
import MainServices from "../components/services/MainServices";

const serviceScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {/* <MainProducts /> */}
        <MainServices />
      </main>
    </>
  );
};

export default serviceScreen;
