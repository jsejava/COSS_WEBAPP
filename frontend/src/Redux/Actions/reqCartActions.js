import axios from "axios";
import baseUrl from "../../components/baseUrl";
import {
  REQCART_ADD_ITEM,
  REQCART_REMOVE_ITEM,
  REQCART_SAVE_PAYMENT_METHOD,
  REQCART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/ReqCartConstants";

// ADD TO CART
export const addToReqCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseUrl}/api/services/${id}`);

  dispatch({
    type: REQCART_ADD_ITEM,
    payload: {
      service: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      provider: data.provider,
      qty,
    },
  });
  localStorage.setItem(
    "reqCartItems",
    JSON.stringify(getState().reqCart.reqCartItems)
  );
};

// REMOVE PRODUCT FROM CART
export const removefromreqcart = (id) => (dispatch, getState) => {
  dispatch({
    type: REQCART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "reqCartItems",
    JSON.stringify(getState().reqCart.reqCartItems)
  );
};

// SAVE SHIPPING ADDRESS
export const saveReqShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: REQCART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("reqShippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const saveReqPaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: REQCART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("ReqPaymentMethod", JSON.stringify(data));
};
