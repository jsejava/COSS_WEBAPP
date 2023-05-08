import {
  SERVICE_CREATE_REVIEW_FAIL,
  SERVICE_CREATE_REVIEW_REQUEST,
  SERVICE_CREATE_REVIEW_RESET,
  SERVICE_CREATE_REVIEW_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
} from "../Constants/ServiceConstants";

//

// ALL SERVICE LIST
export const serviceListReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true, services: [] };
    case SERVICE_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        services: action.payload.services,
      };
    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE SERVICE
export const serviceDetailsReducer = (
  state = { service: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SERVICE_DETAILS_SUCCESS:
      return { loading: false, service: action.payload };
    case SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// SERVICE REVIEW CREATE
export const serviceCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case SERVICE_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
