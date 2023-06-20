import React from "react";

const TopTotal2 = (props) => {
  const { orders, products, requests, services } = props;
  //console.log(requests);
  let totalCharge = 0;
  let totalSale = 0;
  if (requests) {
    requests.map(
      (order) =>
        order.isPaid === true
          ? (totalCharge = totalCharge + order.shippingPrice)
          : null

      // console.log(order.shippingPrice)
    );
  }

  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
  }
  return (
    <>
      <div className="col-lg-4">
        <div className="card">
          {/* <div className="col-lg-4"> */}
          <div className="card card-body">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-primary">
                <i className="text-primary fas fa-usd-circle"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Charges</h6>{" "}
                <span>Gh₵ {totalCharge.toFixed(0)}</span>
              </div>
            </article>
            {/* </div> */}
          </div>
          {/* <div className="col-lg-4"> */}
          <div className="card card-body">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-bags-shopping"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Requests</h6>
                {requests ? <span>{requests.length}</span> : <span>0</span>}
              </div>
            </article>
            {/* </div> */}
          </div>
          {/* <div className="col-lg-4"> */}
          <div className="card card-body ">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="text-warning fas fa-shopping-basket"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Services</h6>
                {services ? <span>{services.length}</span> : <span>0</span>}
              </div>
            </article>
          </div>
          <div className="card card-body ">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="text-warning fas fa-shopping-basket"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Incomes</h6>
                <span>Gh₵ {(totalSale + totalCharge).toFixed(0)}</span>
              </div>
            </article>
          </div>

          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default TopTotal2;
