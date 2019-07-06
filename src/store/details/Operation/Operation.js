import ActionCreator from '../ActionCreator/ActionCreator';
import { adaptDetailsData } from '../util';

export default {
  loadDetails: id => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadDetails());

    return api.get(`/products/${id}`)
      .then((response) => {
        const adaptedData = adaptDetailsData(response.data.data);
        dispatch(ActionCreator.loadDetailsSuccess(adaptedData));
      })
      .catch(() => {
        const error = 'Error';
        ActionCreator.loadDetailsError(error);
      });
  },
};
