import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRequest } from "../Redux/Actions/RequestActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error";

const PlaceRequestScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const reqCart = useSelector((state) => state.reqCart);
  // console.log("reqCart", reqCart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  reqCart.itemsPrice = addDecimals(
    reqCart.reqCartItems.reduce((acc, item) => acc + item.qty, 0)
  );
  reqCart.shippingPrice = addDecimals(
    reqCart.reqCartItems.reduce((acc, item) => acc + item.price, 0)
  );
  reqCart.taxPrice = addDecimals(
    Number((0.15 * reqCart.itemsPrice).toFixed(2))
  );
  reqCart.totalPrice = (
    Number(reqCart.itemsPrice) +
    Number(reqCart.shippingPrice) +
    Number(reqCart.taxPrice)
  ).toFixed(2);
  reqCart.taxPrice = addDecimals(Number((0 * reqCart.itemsPrice).toFixed(2)));
  reqCart.totalPrice = (
    Number(reqCart.itemsPrice) +
    Number(reqCart.shippingPrice) +
    Number(reqCart.taxPrice)
  ).toFixed(2);

  const requestCreate = useSelector((state) => state.requestCreate);
  const { order, success, error } = requestCreate;
  //console.log(order);

  useEffect(() => {
    if (success) {
      if (reqCart.reqPaymentMethod == "Cash") {
        history.push(`/service/cashorder/${order._id}`);
      } else {
        history.push(`/service/request/${order._id}`);
      }

      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);
  const cancelOrderHandler = () => {
    history.push("/service");
  };

  const placeOrderHandler = () => {
    dispatch(
      createRequest({
        orderItems: reqCart.reqCartItems,
        shippingAddress: reqCart.reqShippingAddress,
        paymentMethod: reqCart.reqPaymentMethod,
        itemsPrice: reqCart.itemsPrice,
        shippingPrice: reqCart.shippingPrice,
        taxPrice: reqCart.taxPrice,
        totalPrice: reqCart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>
                  {userInfo.firstname} {userInfo.lastname}
                </p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>
                  Name: {userInfo.firstname} {userInfo.lastname}
                </p>
                <p>Pay method: {reqCart.reqPaymentMethod}</p>
                {/* <p>Type: Service On Request </p> */}
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {reqCart.reqShippingAddress.address},{" "}
                  {reqCart.reqShippingAddress.city}, Room:{" "}
                  {reqCart.reqShippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {reqCart.reqCartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {reqCart.reqCartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>AMOUNT</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SERVICE</h4>
                      <h6>Gh₵ {item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Total Amount</strong>
                  </td>
                  <td>Gh₵ {reqCart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total Service Fee</strong>
                  </td>
                  <td>Gh₵ {reqCart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>Gh₵ {reqCart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>Gh₵ {reqCart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {reqCart.reqCartItems.length === 0 ? null : (
              <>
                <button type="submit" onClick={placeOrderHandler}>
                  REQUEST
                </button>
                <br></br>
                {/* <Link to="/shop"> */}
                <button type="submit" onClick={cancelOrderHandler}>
                  CANCEL REQUEST
                </button>
                {/* </Link> */}
              </>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceRequestScreen;
