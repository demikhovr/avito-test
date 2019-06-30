import {
  LOAD_FAVORITES,
} from '../ActionTypes';

const initialState = {
  favorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES: {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
