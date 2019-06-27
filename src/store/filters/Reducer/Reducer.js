import {
  CHANGE_FILTER_TYPE,
} from '../ActionTypes';

const initialState = {
  filterType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_TYPE: {
      return {
        ...state,
        filterType: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
