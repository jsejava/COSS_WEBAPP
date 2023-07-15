import React from "react";

import moment from "moment";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const socket = io.connect("http://localhost:5000");

const Notify = () => {
  const [order, setOrder] = useState([]);
  const [count, setCount] = useState();
  const [color, setColor] = useState(0);

  useEffect(() => {
    socket.on("receive_order", (data) => {
      setColor(Math.floor(Math.random() * 100 + 1));
      setOrder((order) => [...order, [data]]);
      console.log(Math.floor(Math.random() * 10000 + 1));
    });
  }, [socket]);
  console.log("order", order);
  return (
    <section
      className="py-5 vh-100 bg-danger"
      // style={{
      //   background: "#ff" + color,
      // }}
    >
      <div className="container text-center">
        <div className="d-inline-block mb-5">
          {/* <img className="img-fluid" alt="SVGeXPENSES" width="100" /> */}
        </div>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div
              className="p-4 shadow-sm rounded"
              style={{
                background: "#ff" + color,
              }}
            >
              <form>
                <span className="text-muted">Notification</span>
                {/* <h2 className="fw-light">Payments</h2> */}
                <div className="menu-aside">
                  {/* {order ? (
                    <> */}
                  <Link
                    activeClassName="active"
                    className="order-link"
                    to="/orders"
                  >
                    {/* <i className="icon fas fa-bags-shopping"></i>

                        <span className="text">Orders</span> */}

                    <h2 className="fw-light">
                      New Order
                      <span className="order-notification-badge">
                        {order.length ? order.length : "0"}
                      </span>
                    </h2>
                  </Link>
                  <span>Click To See New Orders</span>
                  {/* {order.orderItems.map((order) => (
            <>
              <h2>item: {order.name}</h2>
              <h2>Qty: {order.qty}</h2>
              <img src={order.image} width={100}></img>
            </>
          ))} */}
                  {/* </>
                  ) : (
                    <>
                      <h1>No New Order</h1>
                    </>
                  )} */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notify;
