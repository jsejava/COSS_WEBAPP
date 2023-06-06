import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditServiceMain from "../components/services/EditServiceMain";

const ServiceEditScreen = ({ match }) => {
  const productId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditServiceMain productId={productId} />
      </main>
    </>
  );
};
export default ServiceEditScreen;
