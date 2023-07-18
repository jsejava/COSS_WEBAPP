import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MobileShopSection = (props) => {
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
        <div className="section ">
          <div className="row">
            <div className="col-lg-12 col-md-12 article"></div>
            <div className="shopcontainer row">
              <div>
                {loading ? (
                  <div>
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    <div className="justify-content-space-between d-flex">
                      <div className="grid shop">
                        {products.map((product) => (
                          <div
                            //className="shop col-lg-4 col-md-6 col-sm-6"
                            className="box"
                            key={product._id}
                          >
                            {/* <div className="border-product"> */}
                            <Link to={`/products/${product._id}`}>
                              <div className="mobileShop">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  width={300}
                                  height={100}
                                />
                                {/* </div> */}
                              </div>

                              {/* <div className="">
                              <img
                                src={product.image}
                                alt={product.name}
                                width={100}
                                height={100}
                              /> */}

                              {/* </div> */}
                            </Link>

                            <div className="mobile-shoptext">
                              <p>
                                <Link to={`/products/${product._id}`}>
                                  {product.name.slice(0, 25)}...
                                </Link>
                              </p>
                              <Rating
                                value={product.rating}
                                // text={`${product.numReviews} reviews`}
                              />
                              <h3>Gh₵ {product.price}</h3>

                              {/* <div>
                              {product.countInStock > 0 ? (
                                <span className="text-info">In Stock</span>
                              ) : (
                                <span className="text-danger">
                                  Out of Stock
                                </span>
                              )}
                            </div> */}
                            </div>
                          </div>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <nav
                  className="float-end pagination"
                  aria-label="Page pagination"
                >
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <Link className="page-link" to="#">
                        Previous
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link" to="#">
                        1
                      </Link>
                    </li>
                    {/* <li className="page-item">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li> */}
                    {/* <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li> */}
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        Next
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileShopSection;

/* Pagination */
/* <Pagination
    pages={pages}
    page={page}
    keyword={keyword ? keyword : ""}
    /> */
