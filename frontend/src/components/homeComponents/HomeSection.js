import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductAction";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import SuccessMessage from "../SuccessMessage";
import payUrl from "../../components/appUrl/payUrl";
import connectionUrl from "../../components/appUrl/connectionUrl";

const HomeSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                <div className="shop col-lg-3 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <Link to="/shop">
                      <div className="pageLogoShop">
                        <img src="./logo/shop.png" alt="shop" />
                      </div>
                    </Link>

                    <div className="welcometext">
                      <p>
                        <Link to="/shop">Store</Link>
                      </p>
                    </div>
                    <Tippy
                      className="tippy-tooltip.tomato-theme"
                      delay={100}
                      placement="bottom"
                      theme="tomato"
                      content={
                        <SuccessMessage
                          title="Campus Online Shop"
                          msg="Exploire, Order, Pay"
                          description="Provision, Food, ect..."
                        />
                      }
                    >
                      <Link to="#">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-info-circle "
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </Link>
                    </Tippy>
                  </div>
                </div>

                <div className="shop col-lg-3 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <Link to="/service">
                      <div className="pageLogo">
                        <img src="./logo/service.png" alt="shop" />
                      </div>
                    </Link>

                    <div className="welcometext">
                      <p>
                        <Link to="/services">Gaz - Electricity</Link>
                      </p>
                    </div>
                    <Tippy
                      className="tippy-tooltip.tomato-theme"
                      delay={100}
                      placement="bottom"
                      theme="tomato"
                      content={
                        <SuccessMessage
                          title="Campus Online Service"
                          msg="Exploire, Request, Pay"
                          description="Gaz, Electricity ect..."
                        />
                      }
                    >
                      <Link to="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-info-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </Link>
                    </Tippy>
                  </div>
                </div>

                <div className="shop col-lg-3 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <a href={payUrl}>
                      <div className="pageLogo">
                        <img src="./logo/pay-5.png" alt="shop" />
                      </div>
                    </a>

                    <div className="welcometext">
                      <p>
                        <a href={payUrl}>Pay</a>
                      </p>
                    </div>

                    <Tippy
                      className="tippy-tooltip.tomato-theme"
                      delay={100}
                      placement="bottom"
                      theme="tomato"
                      content={
                        <SuccessMessage
                          title="Secure Payment System"
                          msg="Do All Transaction Fast and Secure"
                          description="Make Payement, School Fee, Transfer ect..."
                        />
                      }
                    >
                      <Link to="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-info-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </Link>
                    </Tippy>
                  </div>
                </div>

                <div className="shop col-lg-3 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <a href={connectionUrl}>
                      <div className="pageLogo">
                        <img src="./logo/chat.png" />
                      </div>
                    </a>

                    <div className="welcometext">
                      <p>
                        <a href={connectionUrl}>Connection</a>
                      </p>
                    </div>
                    <Tippy
                      className="tippy-tooltip.tomato-theme"
                      delay={100}
                      placement="bottom"
                      theme="tomato"
                      content={
                        <SuccessMessage
                          title="Campus Connection"
                          msg="Coonect With Friend, School Mate And More"
                          description="Register Today Be Join The Family , ect..."
                        />
                      }
                    >
                      <Link to="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-info-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </Link>
                    </Tippy>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
