import {
  LOAD_SELLER,
  LOAD_SELLER_SUCCESS,
  LOAD_SELLER_ERROR,
} from '../ActionTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  seller: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SELLER: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        seller: null,
        error: null,
      };
    }
    case LOAD_SELLER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        seller: action.payload,
      };
    }
    case LOAD_SELLER_ERROR: {
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
