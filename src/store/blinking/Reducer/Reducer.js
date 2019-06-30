import {
  CHANGE_INDEX,
} from '../ActionTypes';

const initialState = {
  index: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INDEX: {
      return {
        ...state,
        index: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
