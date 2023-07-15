import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/LoadingError/Toast";
import { saveReqPaymentMethod } from "../Redux/Actions/reqCartActions";
import Header from "../components/Header";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SuccessMessage from "../components/SuccessMessage";

const ServicePaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const reqCart = useSelector((state) => state.reqCart);
  const { reqShippingAddress } = reqCart;

  if (!reqShippingAddress) {
    history.push("/service/placerequest");
  }

  const [paymentMethod, setPaymentMethod] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod == null) {
      window.alert("Select a payment Methode");
      return;
    } else if (paymentMethod == "CampusPay") {
      dispatch(saveReqPaymentMethod(paymentMethod));
      history.push("/service/placerequest");
    } else if (paymentMethod == "Cash") {
      dispatch(saveReqPaymentMethod(paymentMethod));
      history.push("/service/placerequest");
      // window.alert("Cash Option");
    } else {
      window.alert("Option Not Available");
    }
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value="Cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
                name="selection"

                // disabled
              />
              <label className="form-check-label">Cash</label>
            </div>
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value="CampusPay"
                onChange={(e) => setPaymentMethod(e.target.value)}
                name="selection"
              />
              <label className="form-check-label">CampusPay</label>
            </div>
            {/* </Tippy> */}
            {/* <Tippy
              className="tippy-tooltip.tomato-theme"
              delay={100}
              theme="tomato"
              placement="right"
              content={
                <SuccessMessage
                  title="Momo Payment Method"
                  msg="Is Not Available For The Moment"
                />
              }
            >
              <div className="radio-container">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Momo"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  name="selection"
                  disabled
                />
                <label className="form-check-label">Momo</label>
              </div>
            </Tippy> */}
            {/* <Tippy
              className="tippy-tooltip.tomato-theme"
              delay={100}
              theme="tomato"
              placement="right"
              content={
                <SuccessMessage
                  title="Voda-Cash Payment Method"
                  msg="Is Not Available For The Moment"
                />
              }
            >
              <div className="radio-container">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Voda-Cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  name="selection"
                  disabled
                />
                <label className="form-check-label">Voda-Cash</label>
              </div>
            </Tippy> */}
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ServicePaymentScreen;
