import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import io from "socket.io-client";
import baseUrl from "./baseUrl";
import NotifyUrl from "./appUrl/NotifyUrl";

const socket = io.connect(`${baseUrl}`);

const Header = () => {
  const [order, setOrder] = useState([]);
  const [request, setRequest] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  useEffect(() => {
    socket.on("receive_order", (data) => {
      setOrder((order) => [...order, [data]]);
      localStorage.setItem("data-order", JSON.stringify(data));
    });
    socket.on("receive_request", (data) => {
      setRequest((request) => [...request, [data]]);
      localStorage.setItem("data-request", JSON.stringify(data));
    });
  }, [socket]);

  // const items = order?.map((item) => ({

  // }));

  const dataOrder = localStorage.getItem("data-order")
    ? JSON.parse(localStorage.getItem("data-request"))
    : {};
  const dataRequest = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {};
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="main-header navbar">
      <div className="iframe">
        <iframe src={NotifyUrl}></iframe>
      </div>
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          {/* <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li> */}
          {/* {items.slice(0, 10).map((item) => (
            <li className="nav-item">
              <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
                <span></span>
              </Link>
            </li>
          ))} */}

          <li className="nav-item">
            <Link className="nav-link btn-icon" to="/orders">
              <span>order</span> <i className="fas fa-bell"></i>
              {/* <i className="icon fas fa-bags-shopping "></i> */}
              <span
                className={
                  dataOrder?.paymentMethod == "Cash"
                    ? "header-notification-badge bg-info"
                    : "header-notification-badge bg-danger"
                }
              >
                {order.length ? order.length : "0"}
              </span>
            </Link>
          </li>

          <li className="nav-item ms-5">
            <Link className="nav-link btn-icon" to="/requests">
              <span>request</span> <i className="fas fa-bell"></i>
              {/* <i className="icon fas fa-dolly"></i> */}
              <span
                className={
                  dataRequest?.paymentMethod == "Cash"
                    ? "header-notification-badge bg-info"
                    : "header-notification-badge bg-danger"
                }
              >
                {request.length ? request.length : "0"}
              </span>
            </Link>
          </li>
          {/* <li className="nav-item ms-5 me-5">
            <a className="nav-link" href="http://localhost:3000/">
              Campus Services
            </a>
          </li> */}
          <li className="dropdown nav-item ms-5">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/logo/img.png"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                Exit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
