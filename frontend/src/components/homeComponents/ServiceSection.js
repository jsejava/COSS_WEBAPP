import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listService } from "../../Redux/Actions/ServiceAction";

const ServiceSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services, page, pages } = serviceList;
  // console.log(services);

  useEffect(() => {
    dispatch(listService());
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {services.map((service) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={service._id}
                      >
                        <div className="border-product">
                          <Link to={`/service/services/${service._id}`}>
                            <div className="shopBack">
                              <img src={service.image} alt={service.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/service/services/${service._id}`}>
                                {service.name}
                              </Link>
                            </p>
                            <Rating
                              value={service.rating}
                              text={`${service.numReviews} reviews`}
                            />
                            {/* 
                            <div>
                              {service.countInStock > 0 ? (
                                <span>Available</span>
                              ) : (
                                <span>unavailable</span>
                              )}
                            </div> */}

                            <div>
                              {service.availability == true ? (
                                <span className="text-info">
                                  Service Available
                                </span>
                              ) : (
                                <span className="text-danger">
                                  Service Unavailable
                                </span>
                              )}
                            </div>

                            <h3>Gh₵ {service.price}</h3>
                            {/* Gh₵ */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                {/* <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                /> */}

                <nav className="float-end mt-4" aria-label="Page navigation">
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
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
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

export default ServiceSection;
