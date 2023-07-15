import React, { useEffect, useState } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverRequest,
  getRequestDetails,
  requestOrder,
} from "../../Redux/Actions/RequestActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const RequestDetailmain = (props) => {
  const [cashOption, setCashOption] = useState(false);
  const { orderId } = props;
  const dispatch = useDispatch();

  const requestDetails = useSelector((state) => state.requestDetails);
  const { loading, error, order } = requestDetails;
  //console.log("order", order);
  const requestDeliver = useSelector((state) => state.requestDeliver);
  const { loading: loadingDelivered, success: successDelivered } =
    requestDeliver;

  const requestPay = useSelector((state) => state.requestPay);
  const { loading: loadingPay, success: successPay } = requestPay;

  // console.log("orderPay", orderPay);
  const userid = order?.user._id;
  const useremail = order?.user.email;
  const paymentResult = {
    id: userid,
    update_time: Date.now(),
    email_address: useremail,
  };

  useEffect(() => {
    if (order?.paymentMethod === "Cash") {
      setCashOption(true);
    } else {
      setCashOption(false);
    }
  }, [order]);

  useEffect(() => {
    dispatch(getRequestDetails(orderId));
  }, [dispatch, orderId, successDelivered, successPay]);

  const deliverHandler = () => {
    if (!order.isPaid) {
      return window.alert("Request Not Pay");
    }
    dispatch(deliverRequest(order));
  };

  const payHandler = () => {
    dispatch(requestOrder(orderId, paymentResult));
    dispatch(deliverRequest(order));
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/requests" className="btn btn-dark text-white">
          Back To Requests
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Delivered</option>
                </select>
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                {cashOption ? (
                  <div className="box shadow-sm bg-light">
                    {order.isPaid && order.isDelivered ? (
                      <button className="btn btn-success col-12">
                        PAYED & DELIVERED AT ({" "}
                        {moment(order.paidAt).format("MMM Do YY")})
                      </button>
                    ) : (
                      <>
                        {loadingPay && <Loading />}
                        <button
                          onClick={payHandler}
                          className="btn btn-dark col-12"
                        >
                          MARK AS PAYED & DELIVERED
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="box shadow-sm bg-light">
                    {order.isDelivered ? (
                      <button className="btn btn-success col-12">
                        DELIVERED AT ({" "}
                        {moment(order.isDeliveredAt).format("MMM Do YY")})
                      </button>
                    ) : (
                      <>
                        {loadingDelivered && <Loading />}
                        <button
                          onClick={deliverHandler}
                          className="btn btn-dark col-12"
                        >
                          MARK AS DELIVERED
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RequestDetailmain;
