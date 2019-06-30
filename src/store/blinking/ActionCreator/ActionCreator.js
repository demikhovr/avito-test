import {
  CHANGE_INDEX,
} from '../ActionTypes';

export default {
  changeIndex: index => ({
    type: CHANGE_INDEX,
    payload: index,
  }),
};
