import {
  REQUEST_CREATE_FAIL,
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_RESET,
  REQUEST_CREATE_SUCCESS,
  REQUEST_DETAILS_FAIL,
  REQUEST_DETAILS_REQUEST,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_LIST_MY_FAIL,
  REQUEST_LIST_MY_REQUEST,
  REQUEST_LIST_MY_RESET,
  REQUEST_LIST_MY_SUCCESS,
  REQUEST_PAY_FAIL,
  REQUEST_PAY_REQUEST,
  REQUEST_PAY_RESET,
  REQUEST_PAY_SUCCESS,
} from "../Constants/RequestConstants";

// CREATE REQUEST
export const requestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
      return { loading: true };
    case REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// REQUEST DETAILS
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

// ORDER PAY
export const requestPayReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PAY_REQUEST:
      return { loading: true };
    case REQUEST_PAY_SUCCESS:
      return { loading: false, success: true };
    case REQUEST_PAY_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// USER REQUEST
export const requestListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case REQUEST_LIST_MY_REQUEST:
      return { loading: true };
    case REQUEST_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case REQUEST_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
