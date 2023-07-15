import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Requests = ({ orders, selectedshow, selectedtime }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
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
            {selectedtime ? (
              <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            ) : (
              <td>{moment(order.createdAt).calendar()}</td>
            )}

            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Delivered</span>
              ) : (
                <span className="badge btn-dark">Not delivered</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/service/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Requests;
