import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import payAminUrl from "./appUrl/payAminUrl";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../Redux/Actions/userActions";
import NotifyUrl from "./appUrl/NotifyUrl";

const Sidebar = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const requestList = useSelector((state) => state.requestList);
  const { loading_, error_, requests } = requestList;
  // console.log(orders);
  const ordersResult = orders?.filter(filterFun);
  function filterFun(order) {
    return order?.isDelivered == false;
  }
  const requestResult = requests?.filter(filterFun);
  function filterFun(order) {
    return order?.isDelivered == false;
  }
  // console.log("result", result);
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  // console.log(users);
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              //src="/images/logo.png"
              src="/logo/t2.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/statistics"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Statistics</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Products</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Add product</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/services"
              >
                <i className="icon fas fa-toolbox"></i>
                <span className="text">Services</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addservice"
              >
                <i className="icon fas fa-truck-pickup"></i>
                <span className="text">Add service</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li> */}
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>

                <span className="text">Orders</span>
                <span className="notification-badge">
                  {ordersResult?.length ? ordersResult?.length : "0"}
                </span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/requests"
              >
                <i className="icon fas fa-dolly"></i>
                <span className="text">Requests</span>
                <span className="notification-badge">
                  {requestResult?.length ? requestResult?.length : "0"}
                </span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
                <span className="notification-badge">
                  {users?.length ? users?.length : "0"}
                </span>
              </NavLink>
            </li>

            <li className="menu-item">
              <a
                activeClassName="active"
                className="menu-link"
                href={payAminUrl}
              >
                <i className="icon fas fa-ruble-sign"></i>
                <span className="text">CampusPay</span>
              </a>
            </li>
            <li className="menu-item">
              <a
                activeClassName="active"
                className="menu-link"
                href={NotifyUrl}
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Notification</span>
              </a>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
