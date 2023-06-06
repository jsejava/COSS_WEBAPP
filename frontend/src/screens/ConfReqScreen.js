import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetails, payRequest } from "../Redux/Actions/RequestActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { REQUEST_PAY_RESET } from "../Redux/Constants/RequestConstants";

const ConfReqScreen = ({ history, match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const requestDetails = useSelector((state) => state.requestDetails);
  const { order, loading, error } = requestDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    // order.itemsPrice = addDecimals(
    //   order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    // );
  }

  // useEffect(() => {
  //   if (success) {
  //     dispatch(getRequestDetails(`${order._id}`));
  //     history.push(`/order/${order._id}`);
  //     dispatch({ type: REQUEST_CREATE_RESET });
  //   }
  // }, [history, dispatch, success, order]);

  const placeOrderHandler = () => {
    const orderId = localStorage.getItem("orderId");
    console.log(orderId);
    history.push(`/service/pay/${orderId}`);
  };

  return (
    <>
      <Header />
      <div className="container">
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
                  {/* <a href={`mailto:${order.user.email}`}>{order.user.email}</a> */}
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
                  <strong>Order info</strong>
                </h5>
                Name: {userInfo.firstname} {userInfo.lastname}
                {/* <p>Pay method: {cart.paymentMethod}</p> */}
                <p>Pay method: CampusPay</p>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                {/* <p>
                  Address: {order.shippingAddress.city},{" "}
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.postalCode}
                </p> */}
                {/* {order.isDelivered ? (
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
                )} */}
              </div>
            </div>
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
            onClick={placeOrderHandler}
            type="button"
            class="btn btn-primary btn-lg"
          >
            Confirm Order Info
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfReqScreen;
