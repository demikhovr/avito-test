import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from '../ActionTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  products: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        products: action.payload,
      };
    }
    case LOAD_PRODUCTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
