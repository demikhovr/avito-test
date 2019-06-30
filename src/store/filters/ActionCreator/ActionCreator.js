import {
  CHANGE_FILTERS,
} from '../ActionTypes';

export default {
  changeFilters: filters => ({
    type: CHANGE_FILTERS,
    payload: filters,
  }),
};
