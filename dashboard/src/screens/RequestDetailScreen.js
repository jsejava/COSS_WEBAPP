import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

import ServiceDetailmain from "../components/requests/ServiceDetailmain";

const RequestDetailScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ServiceDetailmain orderId={orderId} />
      </main>
    </>
  );
};

export default RequestDetailScreen;
