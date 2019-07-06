import ActionCreator from '../ActionCreator/ActionCreator';

export default {
  loadSeller: id => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadSeller());

    return api.get(`/sellers/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadSellerSuccess(response.data.data));
      })
      .catch(() => {
        const error = 'Error';
        ActionCreator.loadSellerError(error);
      });
  },
};
