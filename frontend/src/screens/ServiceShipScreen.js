import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveReqShippingAddress } from "../Redux/Actions/reqCartActions";

const ServiceShipScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveReqShippingAddress({ address, city, postalCode, country }));
    history.push("/service/placerequest");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type="text"
            placeholder="Enter Campus"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Hostel"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room Number"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Enter First Name"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          /> */}
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ServiceShipScreen;
