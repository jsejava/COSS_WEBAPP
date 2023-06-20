import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userAction";
import Navbar from "./navBar/navbar";
import { removefromcart } from "../Redux/Actions/cartActions";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const { host, hostname, href, origin, pathname, port, protocol, search } =
    window.location;
  //console.log(pathname);
  const myArray = pathname.split("/");
  let x = myArray[1];
  let y = "service";
  let z = "profile";
  let service;
  let profile;
  //console.log(x);

  if (x == z) {
    profile = z;
  } else {
    if (x == y) {
      //console.log("okay");
      service = y;
    } else {
      service = undefined;
    }
  }

  // console.log(profile);
  //console.log(host);
  // console.log(hostname);
  // console.log(href);
  // console.log(origin);
  // console.log(port);
  // console.log(protocol);
  // console.log(search);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //console.log("cartItems", cartItems);

  const reqCart = useSelector((state) => state.reqCart);
  const { reqCartItems } = reqCart;
  //console.log("reqCartItems", reqCartItems);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("now", userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+233 050 202 7789</p>
              <p>info@campus.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/logo/t2.png" />
                    <img alt="logo" src="/logo/s2.jpeg" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                        {/* <Link className="dropdown-item" to="/order-list">
                          Order
                        </Link>
                        <Link className="dropdown-item" to="/order-list">
                          Request
                        </Link> */}

                        {service ? (
                          <Link
                            className="dropdown-item"
                            to="/service/request-list"
                          >
                            Request
                          </Link>
                        ) : (
                          <Link className="dropdown-item" to="/order-list">
                            Order
                          </Link>
                        )}

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        {/* <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link> */}
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link className="navnavbar-brand" to="/">
                  <img alt="logo" src="/logo/t2.png" />
                  <img alt="logo" src="/logo/s2.jpeg" />
                </Link>
              </div>

              <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                <form onSubmit={submitHandler} className="input-group p-5">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.firstname}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      {/* <Link className="dropdown-item" to="/order-list">
                        Order
                      </Link>
                      <Link className="dropdown-item" to="/profile">
                        Request
                      </Link> */}
                      {service ? (
                        <Link
                          className="dropdown-item"
                          to="/service/request-list"
                        >
                          Request
                        </Link>
                      ) : (
                        <Link className="dropdown-item" to="/order-list">
                          Order
                        </Link>
                      )}

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="#" className="text-warning">
                      <i
                        class="fa fa-shopping-basket text-warning"
                        style={{ fontSize: "20px" }}
                      ></i>{" "}
                      <i>window shopping</i>
                    </Link>
                    {/* <Link to="/login">Login</Link> */}
                    {/* <p>window shopping</p> */}
                  </>
                )}
                {profile ? (
                  <>
                    <Link to="/service/req-cart">
                      {/* <i className="fas fa-shopping-bag"></i> */}
                      <i className="fas fa-toolbox"></i>
                      <span className="badge">{reqCartItems.length}</span>
                    </Link>
                  </>
                ) : null}

                {service ? (
                  <Link to="/service/req-cart">
                    {/* <i className="fas fa-shopping-bag"></i> */}
                    <i className="fas fa-toolbox"></i>
                    <span className="badge">{reqCartItems.length}</span>
                  </Link>
                ) : (
                  <Link to="/cart">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
