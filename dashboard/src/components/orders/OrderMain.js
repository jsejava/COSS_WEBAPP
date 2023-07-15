import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
// import { listOrders } from "../../Redux/Actions/OrderActions";
// import io from "socket.io-client";
// import baseUrl from "../baseUrl";

// const socket = io.connect(`${baseUrl}`);

const OrderMain = () => {
  // const [order, setOrder] = useState();
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedtime, setSelectedtime] = useState(false);
  const [selectedshow, setSelectedShow] = useState(5);

  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  // console.log("selectedshow", selectedshow);
  //console.log(orderList);
  const result = orders?.filter(filterFunc);

  function filterFunc(order) {
    if (selectedOption == "All") {
      return order;
    } else {
      return order?.paymentMethod == selectedOption;
    }
  }

  // useEffect(() => {
  //   socket.on("receive_order", (data) => {
  //     setOrder(data);
  //     dispatch(listOrders());
  //   });
  // }, [socket]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
        {/* {order ? <span>1 New Order</span> : <span>No Order</span>} */}
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
                <option value="All">All</option>
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

            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={selectedtime}
                //onChange={(e) => setSelectedtime(e.target.value)}
                onChange={(e) => setSelectedtime(!selectedtime)}
              >
                <option value={false}>Time</option>
                <option value={true}>Date</option>
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
              <Orders
                orders={result}
                selectedshow={selectedshow}
                selectedtime={selectedtime}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
