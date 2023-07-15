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
import CashOrderScreen from "./screens/CashOrderScreen";
import ServicePaymentScreen from "./screens/ServicePaymentScreen";
import CashRequestScreen from "./screens/CashRequestScreen";

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
        <Route path="/products/:id" component={SingleProduct} exact />
        <Route path="/service/services/:id" component={SingleService} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/login-reg" component={LoginReg} exact />
        <Route path="/register" component={Register} exact />
        <PrivateRouter path="/profile" component={ProfileScreen} exact />
        <PrivateRouter path="/order-list" component={OrderListScreen} exact />
        <PrivateRouter
          path="/service/request-list"
          component={RequestListScreen}
          exact
        />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/service/req-cart/:id?" component={ReqCartScreen} exact />
        <Route path="/sub/:id?" component={SubScreen} exact />
        <PrivateRouter path="/shipping" component={ShippingScreen} exact />
        <PrivateRouter
          path="/service/service-shipping"
          component={ServiceShipScreen}
          exact
        />
        <PrivateRouter path="/payment" component={PaymentScreen} exact />
        <PrivateRouter
          path="/service/payment"
          component={ServicePaymentScreen}
          exact
        />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} exact />
        <PrivateRouter
          path="/service/placerequest"
          component={PlaceRequestScreen}
          exact
        />
        <PrivateRouter path="/ConfOrder" component={ConfOrderScreen} exact />
        {/* <PrivateRouter path="/service/ConfReq" component={ConfReqScreen} /> */}
        <PrivateRouter
          path="/service/ConfReq"
          component={ConfReqScreen}
          exact
        />
        <PrivateRouter path="/order/:id" component={OrderScreen} exact />
        <PrivateRouter
          path="/cashorder/:id"
          component={CashOrderScreen}
          exact
        />
        <PrivateRouter
          path="/service/cashorder/:id"
          component={CashRequestScreen}
        />
        <PrivateRouter
          path="/service/request/:id"
          component={RequestScreen}
          exact
        />
        <PrivateRouter path="/pay" component={PayScreen} exact />
        {/* <PrivateRouter path="/service/pay/:id" component={ReqPayScreen} /> */}
        <PrivateRouter path="/service/pay" component={ReqPayScreen} exact />
        {/* <PrivateRouter path="/Service-Req/:id" component={ServiceRequest} /> */}

        <Route path="*" component={NotFound} exact />
      </Switch>
    </Router>
  );
};

export default App;
