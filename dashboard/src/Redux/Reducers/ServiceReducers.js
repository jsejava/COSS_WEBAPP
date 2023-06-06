import {
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_RESET,
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
  SERVICE_UPDATE_RESET,
  SERVICE_UPDATE_SUCCESS,
} from "../Constants/ServiceConstants";

// ALL PRODUCTS
export const serviceListReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true, products: [] };
    case SERVICE_LIST_SUCCESS:
      return { loading: false, services: action.payload };
    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const serviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return { loading: true };
    case SERVICE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const serviceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CREATE_REQUEST:
      return { loading: true };
    case SERVICE_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT PRODUCT
export const serviceEditReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SERVICE_EDIT_REQUEST:
      return { ...state, loading: true };
    case SERVICE_EDIT_SUCCESS:
      return { loading: false, product: action.payload };
    case SERVICE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PRODUCT
export const serviceUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return { loading: true };
    case SERVICE_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case SERVICE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
