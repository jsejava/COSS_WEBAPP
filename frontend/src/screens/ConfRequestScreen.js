import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getRequestDetails } from "../Redux/Actions/RequestActions";

const ConfRequestScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const reqCart = useSelector((state) => state.reqCart);
  console.log(reqCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const placeOrderHandler = () => {
    const orderId = localStorage.getItem("requestd");
    console.log(orderId);
    history.push(`/service/pay/${orderId}`);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>
                  {userInfo.firstname} {userInfo.lastname}
                </p>
                <p>{userInfo.email}</p>
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
                Name: {userInfo.firstname} {userInfo.lastname}
                {/* <p>Pay method: {cart.paymentMethod}</p> */}
                <p>Pay method: CampusPay</p>
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
                  Address: {reqCart.reqShippingAddress.address},{" "}
                  {reqCart.reqShippingAddress.city}, Room:{" "}
                  {reqCart.reqShippingAddress.postalCode}
                </p>
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

export default ConfRequestScreen;
