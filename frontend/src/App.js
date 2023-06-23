import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShopScreen from "./screens/ShopScreen";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import SingleService from "./screens/SingleService";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ConfOrderScreen from "./screens/ConfOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import PayScreen from "./screens/PayScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import ServiceScreen from "./screens/ServiceScreen";
import SubScreen from "./screens/SubScreen";
import OrderListScreen from "./screens/OrderListScreen";
//import ServiceRequest from "./screens/ServiceRequest";
import PlaceRequestScreen from "./screens/PlaceRequestScreen";
import ServiceShipScreen from "./screens/ServiceShipScreen";
import ReqCartScreen from "./screens/ReqCartScreen";
import RequestScreen from "./screens/RequestScreen";
//import ConfRequestScreen from "./screens/ConfRequestScreen";
import RequestListScreen from "./screens/RequestListScreen";
import ReqPayScreen from "./screens/ReqPayScreen";
import ConfReqScreen from "./screens/ConfReqScreen";
import Text from "./screens/Text";
import LoginReg from "./screens/LoginReg";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/text" component={Text} exact />
        <Route path="/shop" component={ShopScreen} exact />
        <Route path="/service" component={ServiceScreen} exact />
        <Route path="/search/:keyword" component={ShopScreen} exact />
        <Route path="/page/:pagenumber" component={ShopScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={ShopScreen}
          exact
        />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/service/services/:id" component={SingleService} />
        <Route path="/login" component={Login} />
        <Route path="/login-reg" component={LoginReg} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <PrivateRouter path="/order-list" component={OrderListScreen} />
        <PrivateRouter
          path="/service/request-list"
          component={RequestListScreen}
        />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/service/req-cart/:id?" component={ReqCartScreen} />
        <Route path="/sub/:id?" component={SubScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter
          path="/service/service-shipping"
          component={ServiceShipScreen}
        />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter
          path="/service/placerequest"
          component={PlaceRequestScreen}
        />
        <PrivateRouter path="/ConfOrder" component={ConfOrderScreen} />
        {/* <PrivateRouter path="/service/ConfReq" component={ConfReqScreen} /> */}
        <PrivateRouter path="/service/ConfReq" component={ConfReqScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <PrivateRouter path="/service/request/:id" component={RequestScreen} />
        <PrivateRouter path="/pay" component={PayScreen} />
        {/* <PrivateRouter path="/service/pay/:id" component={ReqPayScreen} /> */}
        <PrivateRouter path="/service/pay" component={ReqPayScreen} />
        {/* <PrivateRouter path="/Service-Req/:id" component={ServiceRequest} /> */}

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
