import baseUrl from "../../components/baseUrl";
import {
  REQUEST_DELIVERED_FAIL,
  REQUEST_DELIVERED_REQUEST,
  REQUEST_DELIVERED_SUCCESS,
  REQUEST_DETAILS_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_PAY_FAIL,
  REQUEST_PAY_REQUEST,
  REQUEST_PAY_SUCCESS,
} from "../Constants/RequestConstants";
import { logout } from "./userActions";
import axios from "axios";

export const listRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/request/all`, config);

    // console.log(data);

    dispatch({ type: REQUEST_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQUEST_LIST_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
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

// ORDER DELIVER
export const deliverRequest = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${baseUrl}/api/request/${order._id}/delivered`,
      {},
      config
    );
    dispatch({ type: REQUEST_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REQUEST_DELIVERED_FAIL,
      payload: message,
    });
  }
};

// RESQUEST PAY
export const requestOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
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
        `${baseUrl}/api/request/${orderId}/pay`,
        paymentResult,
        config
      );
      console.log("ORDER UPDATED REDUX", data);
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
