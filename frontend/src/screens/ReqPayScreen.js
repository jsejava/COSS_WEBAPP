import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { payRequest } from "../Redux/Actions/RequestActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { REQUEST_PAY_RESET } from "../Redux/Constants/RequestConstants";

const ReqPayScreen = ({ history, match }) => {
  window.scrollTo(0, 0);

  let userid = document.cookie
    .split(";")
    .find((row) => row.startsWith("userid="))
    ?.split("=")[1];

  const useremail = document.cookie
    .split(" ")
    .find((row) => row.startsWith("useremail="))
    ?.split("=")[1];

  //console.log("cookie", document.cookie);

  const paymentResult = {
    id: userid,
    update_time: Date.now(),
    email_address: useremail,
  };
  // console.log("paymentResult", paymentResult);

  const dispatch = useDispatch();

  const requestPay = useSelector((state) => state.requestPay);
  const { loading: loadingPay, success: successPay } = requestPay;
  console.log("successPay", successPay);
  const requestId = localStorage.getItem("requestId");
  // console.log("requestId", requestId);

  //ispatch(payRequest(requestId, paymentResult));

  // useEffect(() => {

  //   dispatch(payRequest(requestId, paymentResult));
  //   dispatch(getRequestDetails(requestId));
  // }, [dispatch]);

  useEffect(() => {
    if (requestId) {
      dispatch(payRequest(requestId, paymentResult));

      const x = localStorage.removeItem("requestId");
      document.cookie = `userid=; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/service/pay`;
      document.cookie = `useremail= expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure;path=/service/pay`;
    }
  }, []);

  console.log(localStorage.getItem("requestId"));
  const detailsHandler = () => {
    history.push("/service");
  };

  // const detailsHandler = () => {
  //   dispatch(getRequestDetails(requestId));
  //   console.log("order", order);
  // };
  // useEffect(() => {
  //   if (successPay) {
  //     dispatch(getRequestDetails(requestId));
  //   }
  // }, [successPay]);
  // console.log("order", order);

  return (
    <>
      <Header />
      <div className="container">
        <div
          style={{
            marginTop: "50px",
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
            <img alt="logo" src="/logo/paySuc1.jpeg" width={300} height={300} />
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
          Continue Requesting
        </button>
      </div>
      {/* </div> */}
    </>
  );
};

export default ReqPayScreen;
