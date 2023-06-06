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

  useEffect(() => {
    dispatch(listService(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
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
                                <span>Available</span>
                              ) : (
                                <span>unavailable</span>
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
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSection;
