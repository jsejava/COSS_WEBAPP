import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import Select from "react-select";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const hostel_cug = [
    { value: "Chasis", label: "Chasis" },
    { value: "Swiss Life", label: "Swiss Life" },
    { value: "Price Of Peace", label: "Price Of Peace" },
    { value: "Seat Of Wisedom", label: "Seat Of Wisedom" },
    { value: "Barak Hostel", label: "Barak Hostel" },
  ];
  const hostel_uner = [
    { value: "Alpha Logde", label: "Alpha Logde" },
    { value: "Getfun Hostel", label: "Getfun Hostel" },
    { value: "Franco Hostel", label: "Franco Hostel" },
    { value: "Forest View", label: "Forest View" },
  ];
  const hostel_lagon = [
    { value: "Bani Hall", label: "Bani Hall" },
    { value: "Akuafo Hall", label: "Akuafo Hall" },
    { value: "Heaven Gate", label: "Heaven Gate" },
    { value: "Legon Hall", label: "Legon Hall" },
    { value: "African Union Hall", label: "African Union Hall" },
  ];

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [error, setError] = useState(false);

  let hostel = {};
  const campus = [
    { value: "CUG", label: "CUG" },
    { value: "UNER", label: "UNER" },
    { value: "LAGON", label: "LAGON" },
  ];

  if (address == "CUG") {
    hostel = hostel_cug;
  } else if (address == "UNER") {
    hostel = hostel_uner;
  } else {
    hostel = hostel_lagon;
  }
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (postalCode.trim().length === 0) {
      return setError(true);
    }
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
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

          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,

                width: "100%",
                padding: "10px 20px",
                marginTop: "20px",
                border: " 1px solid #e4e4e4",
                bordeRadius: "5px",
                color: "#8a8a8a",
                textAlign: "left",
              }),
            }}
            value={campus.value}
            onChange={(value) => setAddress(value.value)}
            options={campus}
            placeholder={address ? address : "Select Campus"}
          />
          {address ? (
            <>
              {" "}
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "100%",
                    padding: "10px 20px",
                    marginTop: "20px",
                    border: " 1px solid #e4e4e4",
                    bordeRadius: "5px",
                    color: "#8a8a8a",
                    textAlign: "left",
                  }),
                }}
                value={hostel.value}
                onChange={(value) => setCity(value.value)}
                options={hostel}
                placeholder={city ? city : "Select Hostel"}
              />
              {city ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter Room Number"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />

                  {postalCode ? <button type="submit">Continue</button> : null}
                </>
              ) : null}
            </>
          ) : null}
          {error ? (
            <label style={{ color: "red", marginTop: "10px" }}>
              Room Number can't be Empty
            </label>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
