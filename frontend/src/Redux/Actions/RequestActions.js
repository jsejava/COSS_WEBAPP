import baseUrl from "../../components/baseUrl";
import {
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAIL,
  REQUEST_CREATE_RESET,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAIL,
  REQUEST_PAY_REQUEST,
  REQUEST_PAY_SUCCESS,
  REQUEST_PAY_FAIL,
  REQUEST_PAY_RESET,
  REQUEST_LIST_MY_REQUEST,
  REQUEST_LIST_MY_SUCCESS,
  REQUEST_LIST_MY_FAIL,
  REQUEST_LIST_MY_RESET,
} from "../Constants/RequestConstants";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants";
import { logout } from "./userAction";
import { REQCART_CLEAR_ITEMS } from "../Constants/ReqCartConstants";

// CREATE REQUEST
export const createRequest = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${baseUrl}/api/request`, order, config);
    dispatch({ type: REQUEST_CREATE_SUCCESS, payload: data });
    dispatch({ type: REQCART_CLEAR_ITEMS, payload: data });

    localStorage.removeItem("reqCartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQUEST_CREATE_FAIL,
      payload: message,
    });
  }
};

// REQUEST DETAILS
export const getRequestDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/request/${id}`, config);
    //console.log("data: ", data);
    dispatch({ type: REQUEST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQUEST_DETAILS_FAIL,
      payload: message,
    });
  }
};

// REQUEST PAY
export const payRequest =
  (requestId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: REQUEST_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${baseUrl}/api/request/${requestId}/pay`,
        paymentResult,
        config
      );
      console.log("UPDATED REDUX", data);
      dispatch({ type: REQUEST_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: REQUEST_PAY_FAIL,
        payload: message,
      });
    }
  };

// USER REQUEST
export const listMyRequest = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/request/`, config);
    dispatch({ type: REQUEST_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQUEST_LIST_MY_FAIL,
      payload: message,
    });
  }
};
