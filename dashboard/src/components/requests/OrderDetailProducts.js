import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;
  // console.log(order);
  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty, 0)
    );
  }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Price</th>
          <th style={{ width: "20%" }}>Amount</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>Gh₵ {item.price} </td>
            <td>{item.qty} </td>
            <td className="text-end"> Gh₵ {item.qty + item.price}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Amount Total:</dt> <dd>Gh₵ {order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Service cost:</dt> <dd>Gh₵ {order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">Gh₵ {order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Paid
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
