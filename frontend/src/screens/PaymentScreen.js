import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/LoadingError/Toast";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SuccessMessage from "../components/SuccessMessage";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod == null) {
      //window.alert("Select a payment Methode");
      let timerInterval;
      Swal.fire({
        title: "Select a payment Methode...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
      return;
    } else if (paymentMethod == "CampusPay") {
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/placeorder");
    } else if (paymentMethod == "Cash") {
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/placeorder");
      // window.alert("Cash Option");
    } else {
      //window.alert("Option Not Available");
      let timerInterval;
      Swal.fire({
        title: "Option Not Available...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      });
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

export default PaymentScreen;
