import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductAction";

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
                        <Link to="/services">Service</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shop col-lg-3 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <a href="http://localhost:4000/">
                      <div className="pageLogo">
                        <img src="./logo/pay-5.png" alt="shop" />
                      </div>
                    </a>

                    <div className="welcometext">
                      <p>
                        <Link to="/campuspay">Pay</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shop col-lg-3 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <a href="http://localhost:4001/">
                      <div className="pageLogo">
                        <img src="./logo/chat.png" />
                      </div>
                    </a>

                    <div className="welcometext">
                      <p>
                        <Link to="/campuspay">Connect</Link>
                      </p>
                    </div>
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
