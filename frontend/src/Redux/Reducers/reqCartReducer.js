import {
  REQCART_ADD_ITEM,
  REQCART_CLEAR_ITEMS,
  REQCART_REMOVE_ITEM,
  REQCART_SAVE_PAYMENT_METHOD,
  REQCART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/ReqCartConstants";

export const reqCartReducer = (
  state = { reqCartItems: [], reqShippingAddress: {} },
  action
) => {
  switch (action.type) {
    case REQCART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.reqCartItems.find(
        (x) => x.service === item.service
      );

      if (existItem) {
        return {
          ...state,
          reqCartItems: state.reqCartItems.map((x) =>
            x.service === existItem.service ? item : x
          ),
        };
      } else {
        return {
          ...state,
          reqCartItems: [...state.reqCartItems, item],
        };
      }
    case REQCART_REMOVE_ITEM:
      return {
        ...state,
        reqCartItems: state.reqCartItems.filter(
          (x) => x.service !== action.payload
        ),
      };
    case REQCART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        reqShippingAddress: action.payload,
      };
    case REQCART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        reqPaymentMethod: action.payload,
      };
    case REQCART_CLEAR_ITEMS:
      return {
        ...state,
        reqCartItems: [],
      };
    default:
      return state;
  }
};
