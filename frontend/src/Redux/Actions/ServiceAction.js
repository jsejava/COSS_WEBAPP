import axios from "axios";
// import { Redirect } from "react-router";
import {
  SERVICE_CREATE_REVIEW_FAIL,
  SERVICE_CREATE_REVIEW_REQUEST,
  SERVICE_CREATE_REVIEW_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
} from "../Constants/ServiceConstants";

import { logout } from "./userAction";

//   SERVICE LIST
export const listService =
  // (keyword = " ", pageNumber = " ") =>
  () => async (dispatch) => {
    try {
      dispatch({ type: SERVICE_LIST_REQUEST });
      const { data } = await axios.get(
        //`http://localhost:5000/api/services?keyword=${keyword}&pageNumber=${pageNumber}`
        `http://localhost:5000/api/services`
      );
      dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SERVICE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE SERVICE
export const listServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/api/services/${id}`
    );
    dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   SERVICE REVIEW CREATE
export const createServiceReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: SERVICE_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:5000/api/Services/${productId}/review`,
        review,
        config
      );
      // Redirect(`/services/:${id}`);
      dispatch({ type: SERVICE_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SERVICE_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
