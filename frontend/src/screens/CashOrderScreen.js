import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";

import addExpenceUrl from "../components/appUrl/addExpenceUrl";

const CashOrderScreen = ({ history, match }) => {
  window.scrollTo(0, 0);
  // const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //console.log(order);
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  if (order) {
    const { _id } = order;
    console.log(_id);
    localStorage.setItem("orderId", _id);
    const x = localStorage.getItem("orderId");
    console.log("local", x);
  }
  const detailsHandler = () => {
    history.push("/shop");
  };
  function doOnce() {
    const total = order.totalPrice;
    const x = order.orderItems;
    let names = "";
    x.forEach((element, index, array) => {
      names += element.name + " ";
    });
    const cookieName = names;
    //console.log(cookieVal);
    document.cookie = `item=${cookieName}; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/add-expense`;
    document.cookie = `total=${total} expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/add-expense`;
    console.log(cookieName);
    console.log(typeof cookieName);
    // set cookies
    // const itemCookie = JSON.stringify(items);

    // const items = x.map((item) => ({
    //   name: item.name,
    // }));
    // let txt = "";
    // for (let item in items) {
    //   txt += items.name[item] + " ";
    // }

    // items.total = total;
    // console.log(items);
  }

  // function resetOnce() {
  //   console.log("okay");
  //   document.cookie =
  //     "total=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure";
  //   document.cookie = `name=; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure`;
  // }

  return (
    <>
      <Header />
      <div className="container">
        <div id="div">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <div className="row  order-detail">
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Customer</strong>
                      </h5>
                      <p>
                        {userInfo.firstname} {userInfo.lastname}
                      </p>
                      <p>
                        <a href={`mailto:${order.user.email}`}>
                          {order.user.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                {/* 2 */}
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-truck-moving"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Order info</strong>
                      </h5>
                      {/* username */}
                      {/* <p>Name: {order.shippingAddress.country}</p> */}
                      <p>
                        Name: {userInfo.firstname} {userInfo.lastname}
                      </p>
                      <p>Pay method: {order.paymentMethod}</p>
                      {order.isPaid ? (
                        <div className="bg-info p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Paid on {moment(order.paidAt).calendar()}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-danger p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Not Paid
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* 3 */}
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Deliver to</strong>
                      </h5>
                      <p>
                        Address: {order.shippingAddress.city},{" "}
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.postalCode}
                      </p>
                      {order.isDelivered ? (
                        <div className="bg-info p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Delivered on {moment(order.deliveredAt).calendar()}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-danger p-2 col-12">
                          <p className="text-white text-center text-sm-start">
                            Not Delivered
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row order-products justify-content-between">
                <div className="col-lg-8">
                  {order.orderItems.length === 0 ? (
                    <Message variant="alert-info mt-5">
                      Your order is empty
                    </Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
                        <div className="order-product row" key={index}>
                          <div className="col-md-3 col-6">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="col-md-5 col-6 d-flex align-items-center">
                            <Link to={`/products/${item.product}`}>
                              {/* name */}
                              <h6>{item.name}</h6>
                            </Link>
                          </div>
                          <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                            <h4>QUANTITY</h4>
                            <h6>{item.qty}</h6>
                          </div>
                          <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                            <h4>SUBTOTAL</h4>
                            <h6>Gh₵ {item.qty * item.price}</h6>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {/* total */}
                <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Products</strong>
                        </td>
                        <td>Gh₵ {order.itemsPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Shipping</strong>
                        </td>
                        <td>Gh₵ {order.shippingPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tax</strong>
                        </td>
                        <td>Gh₵ {order.taxPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        {/* total */}
                        <td>Gh₵ {order.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* {!order.isPaid && (
                    <div className="col-12">
                      {
                        <a href={addExpenceUrl}>
                          <button
                            id="myBtn"
                            className="round-black-btn mb-4"
                            onClick={doOnce}
                          >
                            Make payment
                          </button>
                        </a>
                      }
                      {
                        <a href="/order-list">
                          <button
                            id="myBtn"
                            className="round-black-btn"
                            // onClick={doOnce}
                          >
                            Pay Later
                          </button>
                        </a>
                      }
                    </div>
                  )} */}
                </div>
                {/* <div className="col-lg-12 col-sm-4 mb-lg-4 mt-5 mb-sm-0">
                  <h1>
                    Order Successful, A Delivery Agent Will Be At Your Door Step
                    Shortly
                  </h1>
                </div> */}
                {/* <div className="container"> */}
                <div
                  style={{
                    marginTop: "25px",
                  }}
                  className="row order-detail"
                >
                  <h1
                    style={{
                      display: "flex",

                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/* <img
                      alt="logo"
                      src="/logo/paySuc1.jpeg"
                      width={300}
                      height={300}
                    /> */}
                    Order Successful, A Delivery Agent Will Be At Your Door Step
                    Shortly
                  </h1>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  height: "10px",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "40px",
                }}
              >
                <button
                  onClick={detailsHandler}
                  type="button"
                  class="btn btn-primary btn-lg"
                >
                  Continue Shopping
                </button>
              </div>
              {/* </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CashOrderScreen;
