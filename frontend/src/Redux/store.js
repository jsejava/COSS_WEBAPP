import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
} from "../Redux/Reducers/ProductReducer";
import {
  serviceCreateReviewReducer,
  serviceDetailsReducer,
  serviceListReducer,
} from "../Redux/Reducers/ServiceReducer";
import { cartReducer } from "./Reducers/CartReducers";
import { reqCartReducer } from "./Reducers/reqCartReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from "./Reducers/OrderReducres";
import {
  requestCreateReducer,
  requestDetailsReducer,
  requestListMyReducer,
  requestPayReducer,
} from "./Reducers/RequestReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,

  serviceList: serviceListReducer,
  serviceDetails: serviceDetailsReducer,
  serviceReviewCreate: serviceCreateReviewReducer,

  cart: cartReducer,
  reqCart: reqCartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,

  requestCreate: requestCreateReducer,
  requestDetails: requestDetailsReducer,
  requestPay: requestPayReducer,
  requestListMy: requestListMyReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reqCartItemsFromLocalStorage = localStorage.getItem("reqCartItems")
  ? JSON.parse(localStorage.getItem("reqCartItems"))
  : [];

//const reqCartItemsFromLocalStorage = [];

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const reqShippingAddressFromLocalStorage = localStorage.getItem(
  "reqShippingAddress"
)
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  reqCart: {
    reqCartItems: reqCartItemsFromLocalStorage,
    reqShippingAddress: reqShippingAddressFromLocalStorage,
  },

  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
