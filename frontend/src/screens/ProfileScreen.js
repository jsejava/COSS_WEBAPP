import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import { getUserDetails } from "../Redux/Actions/userAction";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import { listMyRequest } from "../Redux/Actions/RequestActions";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import { Link } from "react-router-dom";

const ProfileScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;
  //console.log("orders", orders?.length);

  const requestListMy = useSelector((state) => state.requestListMy);

  const { orders: requests } = requestListMy;

  console.log("orders", orders?.length);

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(listMyRequest());

    dispatch(getUserDetails("profile"));
  }, [dispatch]);
  const orderListHandler = () => {
    history.push("/order-list");
  };
  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="./images/user.png" alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>
                      {userInfo.firstname} {userInfo.lastname}
                    </strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo.createdAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div class="d-flex align-items-start">
                <div
                  class="nav align-items-start"
                  // id="v-pills-tab"
                  // role="tablist"
                  //aria-orientation="vertical"
                  //class="nav align-items-start flex-column"
                  //id="v-pills-tab"
                  //role="tablist"
                  //aria-orientation="vertical"
                >
                  {/* <Orders orders={orders} loading={loading} error={error} /> */}

                  <button
                    class="nav-link active d-flex justify-content-center"
                    // onClick={orderListHandler}
                  >
                    <li className="nav-item mb-2">
                      <Link
                        to="/order-list"
                        className="btn btn-outline-danger me-3"
                      >
                        Order List
                      </Link>
                    </li>

                    <span className="badge2  me-5">
                      {orders ? orders.length : 0}
                    </span>

                    <li className="nav-item mb-2">
                      <Link
                        to="/service/request-list"
                        className="btn btn-outline-danger me-3"
                      >
                        Request List
                      </Link>
                    </li>

                    <span className="badge2">
                      {requests ? requests.length : 0}
                    </span>
                  </button>

                  <button class="nav-link active d-flex justify-content-center">
                    <li className="nav-item mb-2">
                      <Link to="/shop" className="btn btn-outline-success me-5">
                        Campus Shop
                      </Link>
                    </li>

                    <li className="nav-item mb-2">
                      <Link
                        to="/service"
                        className="btn btn-outline-success ms-5"
                      >
                        Campus Service
                      </Link>
                    </li>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              {/* <Orders orders={orders} loading={loading} error={error} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
