import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from '../ActionTypes';

export default {
  loadProducts: () => ({
    type: LOAD_PRODUCTS,
  }),
  loadProductsSuccess: products => ({
    type: LOAD_PRODUCTS_SUCCESS,
    payload: products,
  }),
  loadProductsError: error => ({
    type: LOAD_PRODUCTS_ERROR,
    payload: error,
  }),
};
