import React, { useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useSelector } from "react-redux";

const OrderMain = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  // const [status, setStatus] = useState(null);
  const [selectedshow, setSelectedShow] = useState(5);
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  // console.log("selectedshow", selectedshow);
  // console.log(orders);
  const result = selectedOption ? orders?.filter(checkAdult) : orders;

  function checkAdult(order) {
    return order?.paymentMethod == selectedOption;
  }
  console.log("result", result);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option>All</option>
                <option value="Cash">Cash</option>
                <option value="CampusPay">CampusPay</option>
                {/* <option>Paid</option>
                <option>Delivered</option>
                <option>Paid</option>
                <option>Delivered</option> */}
              </select>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={selectedshow}
                onChange={(e) => setSelectedShow(e.target.value)}
              >
                <option value={5}>Show 5</option>
                <option value={10}>Show 10</option>
                <option value={15}>Show 15</option>
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
                <option value={40}>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={result} selectedshow={selectedshow} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
