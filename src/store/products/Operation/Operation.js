import ActionCreator from '../ActionCreator/ActionCreator';
import { adaptProductData } from '../util';

export default {
  loadProducts: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadProducts());

    return api.get('/products')
      .then((response) => {
        const adaptedData = response.data.data.map(adaptProductData);
        dispatch(ActionCreator.loadProductsSuccess(adaptedData));
      })
      .catch(() => {
        const error = 'Error';
        ActionCreator.loadProductsError(error);
      });
  },
};
