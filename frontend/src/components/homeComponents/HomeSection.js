import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const HomeSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

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
                <div className="shop col-lg-4 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <Link to="/shop">
                      <div className="welcomeBack">
                        <img
                          src="https://cdn.pixabay.com/photo/2017/05/10/11/51/online-shopping-2300665_1280.jpg"
                          alt="shop"
                        />
                      </div>
                    </Link>

                    <div className="welcometext">
                      <p>
                        <Link to="/shop">Campus Store</Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shop col-lg-4 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    <Link to="/service">
                      <div className="welcomeBack">
                        <img
                          src="https://cdn.pixabay.com/photo/2020/09/20/04/28/delivery-5585969_1280.jpg"
                          alt="shop"
                        />
                      </div>
                    </Link>

                    <div className="welcometext">
                      <p>
                        <Link to="/services">Campus Service</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shop col-lg-4 col-md-6 col-sm-6">
                  <div className="border-welcome">
                    {/* <Link to="http://localhost:3000/"> */}
                    <a href="http://localhost:4000/">
                      <div className="welcomeBack">
                        <img
                          src="https://cdn.pixabay.com/photo/2019/06/20/17/59/online-banking-4287719_1280.jpg"
                          alt="shop"
                        />
                      </div>
                      {/* </Link> */}
                    </a>

                    <div className="welcometext">
                      <p>
                        <Link to="/campuspay">Campus Pay</Link>
                      </p>
                    </div>
                  </div>
                </div>
                {/* 
                <div className="channel-list__sidebar__icon1">
                  <a className="icon1__inner" href="http://localhost:3000/">
                    <img alt="logo" src="/logo/ca1.jpg" width="41" />;
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
