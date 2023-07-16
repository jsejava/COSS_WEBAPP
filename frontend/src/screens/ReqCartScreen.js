import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { addToCart, removefromcart } from "../Redux/Actions/cartActions";
import {
  addToReqCart,
  removefromreqcart,
} from "../Redux/Actions/reqCartActions";

const ReqCartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const serviceId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const reqCart = useSelector((state) => state.reqCart);
  const { reqCartItems } = reqCart;
  console.log(reqCart);

  const total = reqCartItems
    .reduce((a, i) => a + i.qty + i.price, 0)
    .toFixed(2);
  // console.log(total);

  useEffect(() => {
    if (serviceId) {
      dispatch(addToReqCart(serviceId, qty));
    }
  }, [dispatch, serviceId, qty]);

  const checkOutHandler = () => {
    history.push("/login?redirect=service/service-shipping");
  };
  const removeFromCartHandle = (id) => {
    dispatch(removefromreqcart(id));
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {reqCartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your request cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/service"
              style={{
                fontSize: "12px",
              }}
            >
              REQUEST NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Services
              <Link className="text-success mx-2" to="/cart">
                ({reqCartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {reqCartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.service)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/services/${item.service}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>AMOUNT</h6>

                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToReqCart(item.service, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={(x + 1) * 10}>
                        {(x + 1) * 10} GH¢
                      </option>
                    ))}
                    {/* {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={(x + 1) * 1}>
                        {(x + 1) * 1} GH¢
                      </option>
                    ))} */}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>SERVICE</h6>
                  <h4>GH¢ {item.price}</h4>
                  {/* GH₵ GH¢*/}
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">GH¢ {total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/service" className="col-md-6 ">
                <button>Continue To Request</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ReqCartScreen;
