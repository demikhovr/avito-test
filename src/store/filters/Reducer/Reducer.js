import {
  CHANGE_FILTERS,
} from '../ActionTypes';

const initialState = {
  filters: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTERS: {
      return {
        ...state,
        filters: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
