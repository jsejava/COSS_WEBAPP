import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

import RequestDetailmain from "../components/requests/ RequestDetailmain";

const RequestDetailScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <RequestDetailmain orderId={orderId} />
      </main>
    </>
  );
};

export default RequestDetailScreen;
