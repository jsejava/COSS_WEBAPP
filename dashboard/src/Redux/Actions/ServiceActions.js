import baseUrl from "../../components/baseUrl";
import {
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_DELETE_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_EDIT_FAIL,
  SERVICE_EDIT_REQUEST,
  SERVICE_EDIT_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
} from "../Constants/ServiceConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listServices = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/services/all`, config);
    // console.log(data);
    dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERVICE_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteService = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${baseUrl}/api/services/${id}`, config);

    dispatch({ type: SERVICE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERVICE_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createService =
  (name, price, description, image, countInStock, availability) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SERVICE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/services/`,
        { name, price, description, image, countInStock, availability },
        config
      );

      dispatch({ type: SERVICE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SERVICE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PRODUCT
export const editService = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_EDIT_REQUEST });
    const { data } = await axios.get(`${baseUrl}/api/services/${id}`);
    dispatch({ type: SERVICE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERVICE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateService = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: SERVICE_UPDATE_REQUEST });

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
      `${baseUrl}/api/services/${product._id}`,
      product,
      config
    );

    dispatch({ type: SERVICE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: SERVICE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SERVICE_UPDATE_FAIL,
      payload: message,
    });
  }
};
