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
        <button
          className="round-black-btn"
          // amount={order.totalPrice}
          onClick={placeOrderHandler}
        >
          comfirm order
        </button>
      </div>
    </>
  );
};

export default PayScreen;
