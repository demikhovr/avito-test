import {
  LOAD_DETAILS,
  LOAD_DETAILS_SUCCESS,
  LOAD_DETAILS_ERROR,
} from '../ActionTypes';

export default {
  loadDetails: () => ({
    type: LOAD_DETAILS,
  }),
  loadDetailsSuccess: details => ({
    type: LOAD_DETAILS_SUCCESS,
    payload: details,
  }),
  loadDetailsError: error => ({
    type: LOAD_DETAILS_ERROR,
    payload: error,
  }),
};
