import {
  LOAD_SELLER,
  LOAD_SELLER_SUCCESS,
  LOAD_SELLER_ERROR,
} from '../ActionTypes';

export default {
  loadSeller: () => ({
    type: LOAD_SELLER,
  }),
  loadSellerSuccess: seller => ({
    type: LOAD_SELLER_SUCCESS,
    payload: seller,
  }),
  loadSellerError: error => ({
    type: LOAD_SELLER_ERROR,
    payload: error,
  }),
};
