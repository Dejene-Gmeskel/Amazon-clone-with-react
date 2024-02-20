import { Type } from "./actionType";
export const initialState = {
    cart: [],
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case Type.ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, action.items],
        };
      default:
        return state;
    }
  };
  