import {
  REQUEST_DELIVERED_FAIL,
  REQUEST_DELIVERED_REQUEST,
  REQUEST_DELIVERED_RESET,
  REQUEST_DELIVERED_SUCCESS,
  REQUEST_DETAILS_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
} from "../Constants/RequestConstants";

export const requestListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case REQUEST_LIST_REQUEST:
      return { loading_: true };
    case REQUEST_LIST_SUCCESS:
      return { loading_: false, requests: action.payload };
    case REQUEST_LIST_FAIL:
      return { loading_: false, error_: action.payload };
    default:
      return state;
  }
};

// ORDER DETAILS
export const requestDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case REQUEST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case REQUEST_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case REQUEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DELIVERED
export const requestDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DELIVERED_REQUEST:
      return { loading: true };
    case REQUEST_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case REQUEST_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};
