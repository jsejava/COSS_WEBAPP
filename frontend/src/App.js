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

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
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
        <Route path="/services/:id" component={SingleService} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/sub/:id?" component={SubScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/ConfOrder" component={ConfOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <PrivateRouter path="/pay/:id" component={PayScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
