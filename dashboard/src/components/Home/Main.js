import React from "react";
import TopTotal1 from "./TopTotal1";
import TopTotal2 from "./TopTotal2";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";

import { useSelector } from "react-redux";
import LatestRequest from "./LatestRequest";
import ServicesStatistics from "./ServicesStatistics";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  // console.log(orders);
  const requestList = useSelector((state) => state.requestList);
  const { loading_, error_, requests } = requestList;
  //console.log(requests);
  // console.log(requestList);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const serviceList = useSelector((state) => state.serviceList);
  const { services } = serviceList;
  //console.log(services);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <div className="row">
          <TopTotal1
            orders={orders}
            products={products}
            requests={requests}
            services={services}
          />
        </div>

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          {/* <ProductsStatistics /> */}
          <ServicesStatistics />

          <TopTotal2
            orders={orders}
            products={products}
            requests={requests}
            services={services}
          />
        </div>

        {/* LATEST ORDER */}

        <div className="row">
          <div className="col-lg-6">
            <div className="card mb-4 shadow-sm">
              <LatestOrder orders={orders} loading={loading} error={error} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card mb-4 shadow-sm">
              <LatestRequest
                orders={requests}
                loading={loading_}
                error={error_}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
