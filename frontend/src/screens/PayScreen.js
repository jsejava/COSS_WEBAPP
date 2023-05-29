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

const PayScreen = ({ history, match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  // console.log("ok", match.params);
  // const paymentResult = {
  //   id: orderId,
  //   //   // status: req.body.status,
  //   //   // update_time: req.body.update_time,
  //   //   // email_address: req.body.email_address,
  // };
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, order]);

  const placeOrderHandler = () => {
    dispatch(payOrder(orderId));
    history.push(`/shop`);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* <div className="row order-detail"> */}
        <div
          style={{
            // display: "flex",
            // height: "10px",
            // width: "100%",
            // justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "column",
            marginTop: "50px",
          }}
          className="row order-detail"
        >
          {/* <div className="col-lg-8 col-sm-8 mb-lg-8 mb-5 mb-sm-0"> */}
          {/* <div className="row "> */}
          {/* <div className="col-md-8 center"></div> */}
          <h1
            style={{
              display: "flex",
              // height: "10px",
              // width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // marginTop: "40px",
            }}
          >
            <i>
              Thanks For Being With Us, Will Be At Your Door Step As Soon As
              Possible
            </i>
          </h1>
          {/* <div className="col-md-8 center"></div> */}
          {/* </div> */}
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
          Submit Order
        </button>
      </div>
      {/* </div> */}
    </>
  );
};

export default PayScreen;
