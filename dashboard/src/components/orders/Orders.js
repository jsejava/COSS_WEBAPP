import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = ({ orders, selectedshow }) => {
  console.log(selectedshow);
  // const { orders } = props;
  //console.log(orders.user.firstname);
  // console.log("orders", orders);
  // const result = orders.filter(checkAdult);

  // function checkAdult(order) {
  //   return order?.paymentMethod == "CampusPay";
  // }
  // console.log("result", result);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          {/* <th scope="col">Email</th> */}
          <th scope="col">Payment Methode</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {/* {orders?.map((order) => console.log(order?.user.firstname))} */}
        {orders?.slice(0, selectedshow).map((order) => (
          <tr
            key={order?._id}
            className={
              order?.isPaid &&
              !order?.isDelivered &&
              order?.paymentMethod == "CampusPay"
                ? "bg-info"
                : ""
            }
          >
            <td>
              <b>
                {order?.user?.firstname} {order?.user?.lastname}
              </b>
            </td>
            {/* <td>{order?.user?.email}</td> */}
            <td>{order?.paymentMethod}</td>
            <td>Gh₵ {order?.totalPrice}</td>
            <td>
              {order?.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Paid At {moment(order.paidAt).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  {order?.paymentMethod == "Cash"
                    ? "Pending Order"
                    : "Not Paid"}
                </span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Delivered</span>
              ) : (
                <span className="badge btn-dark">Not delivered</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}

        {/* Not paid Not delivered */}
        {/* <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Orders;
