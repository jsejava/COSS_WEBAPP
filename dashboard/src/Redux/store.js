import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  serviceCreateReducer,
  serviceDeleteReducer,
  serviceEditReducer,
  serviceListReducer,
  serviceUpdateReducer,
} from "./Reducers/ServiceReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./Reducers/OrderReducres";
import {
  requestDeliveredReducer,
  requestDetailsReducer,
  requestListReducer,
  requestPayReducer,
} from "./Reducers/RequestReducres";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  serviceList: serviceListReducer,
  serviceDelete: serviceDeleteReducer,
  serviceCreate: serviceCreateReducer,
  serviceEdit: serviceEditReducer,
  serviceUpdate: serviceUpdateReducer,

  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  orderPay: orderPayReducer,

  requestList: requestListReducer,
  requestDetails: requestDetailsReducer,
  requestDeliver: requestDeliveredReducer,
  requestPay: requestPayReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
