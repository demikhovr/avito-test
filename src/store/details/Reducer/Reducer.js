import {
  LOAD_DETAILS,
  LOAD_DETAILS_SUCCESS,
  LOAD_DETAILS_ERROR,
} from '../ActionTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  details: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DETAILS: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        details: null,
        error: null,
      };
    }
    case LOAD_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        details: action.payload,
      };
    }
    case LOAD_DETAILS_ERROR: {
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
