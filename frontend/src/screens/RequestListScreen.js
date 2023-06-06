import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import { getUserDetails } from "../Redux/Actions/userAction";
import moment from "moment";
import { listMyRequest } from "../Redux/Actions/RequestActions";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import { Link } from "react-router-dom";
import Requests from "../components/profileComponents/Requests";

const RequestListScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const requestListMy = useSelector((state) => state.requestListMy);

  const { loading, error, orders } = requestListMy;

  console.log("orders", orders?.length);

  useEffect(() => {
    dispatch(listMyRequest());
    //dispatch(getOrderDetails());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);
  const orderListHandler = () => {
    history.push("/service");
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
                  {/* <img src="./images/user.png" alt="userprofileimage" /> */}
                  <img src="../images/user.png" alt="userprofileimage" />
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
                  class="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active d-flex justify-content-center"
                    onClick={orderListHandler}
                    id="v-pills-profile-tab"
                  >
                    <li className="nav-item mb-2">
                      <Link
                        to="/service"
                        className="btn btn-outline-danger me-2"
                      >
                        Continue Requesting
                      </Link>
                    </li>
                  </button>
                  {/* <Orders orders={orders} loading={loading} error={error} /> */}
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
              <Requests orders={orders} loading={loading} error={error} />
              {/* <ProfileTabs /> */}
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

export default RequestListScreen;
