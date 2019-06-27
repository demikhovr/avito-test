import {
  CHANGE_FILTER_TYPE,
} from '../ActionTypes';

export default {
  changeFilterType: (type) => ({
    type: CHANGE_FILTER_TYPE,
    payload: type,
  }),
};
