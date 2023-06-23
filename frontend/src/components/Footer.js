import React from "react";
import { Link } from "react-router-dom";
import payUrl from "../components/appUrl/payUrl";
import connectionUrl from "../components/appUrl/payUrl";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex">
        <div className="card-name">
          <Link to="/shop">
            <img alt="mastercard" src="./logo/shop.png" />
          </Link>
        </div>

        <div className="card-name">
          <Link to="/service">
            <img alt="mastercard" src="./logo/service.png" />
          </Link>
        </div>
        <div className="card-name">
          <a href={payUrl}>
            <img alt="visa" src="./logo/pay-5.png" />
          </a>
        </div>

        <div className="card-name">
          <a href={connectionUrl}>
            <img alt="express" src="./logo/chat.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
