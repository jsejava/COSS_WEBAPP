import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductAction";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SuccessMessage from "../SuccessMessage";
import payUrl from "../appUrl/payUrl";
import connectionUrl from "../appUrl/connectionUrl";

const MobileHomeSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="home">
            <div className="justify-content-space-between d-flex">
              <div className="grid">
                {/* <div className="card-name"> */}
                <div className="box">
                  <div className="home-img">
                    <Link to="/shop">
                      <img alt="mastercard" src="./logo/shop.png" />
                    </Link>
                  </div>
                  <p className="home-text1">Shop</p>
                </div>

                {/* <div className="card-name"> */}
                <div className="box">
                  <div className="home-img">
                    <Link to="/service">
                      <img alt="mastercard" src="./logo/service.png" />
                    </Link>
                  </div>
                  <p className="home-text">Service</p>
                </div>
                {/* <div className="card-name"> */}
                <div className="box">
                  <div className="home-img">
                    <a href={payUrl}>
                      <img alt="visa" src="./logo/pay-5.png" />
                    </a>
                  </div>
                  <p className="home-text">Pay</p>
                </div>

                {/* <div className="card-name"> */}
                <div className="box">
                  <div className="home-img">
                    <a href={connectionUrl}>
                      <img alt="express" src="./logo/chat.png" />
                    </a>
                  </div>
                  <p className="home-text">Connection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHomeSection;
