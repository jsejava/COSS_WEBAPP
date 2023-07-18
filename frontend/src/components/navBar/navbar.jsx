import React, { useState } from "react";
import "./navbar.css";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <>
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

      <nav className="nav">
        <div className="col-md-2 col-4 d-flex align-items-center navbarlogo">
          <Link className="navbar-brand" to="/">
            <img alt="logo" src="/logo/t2.png" />
            <img alt="logo" src="/logo/s2.jpeg" />
          </Link>
        </div>
        <div className="pc-header">
          <ul className={active}>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Home
              </a>
            </li>

            <li className="nav__item">
              <a href="/shop" className="nav__link">
                Store
              </a>
            </li>
            <li className="nav__item">
              <a href="/service" className="nav__link">
                Service
              </a>
            </li>
            <li className="nav__item">
              <a href="http://localhost:4000" className="nav__link">
                Pay
              </a>
            </li>
            <li className="nav__item">
              <a href="http://localhost:4001/" className="nav__link">
                Connect
              </a>
            </li>
          </ul>
          <div onClick={navToggle} className={icon}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
