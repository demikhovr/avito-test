import ActionCreator from '../ActionCreator/ActionCreator';
import { getFavorites } from '../selectors';

export default {
  loadFavorites: () => (dispatch) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    dispatch(ActionCreator.loadFavorites(favorites));
  },
  changeFavorite: id => (dispatch, _getState) => {
    const state = _getState();
    const favorites = getFavorites(state);
    const index = favorites.findIndex(it => it === id);
    const inFavorites = index !== -1;
    const updatedFavorites = inFavorites
      ? [
        ...favorites.slice(0, index),
        ...favorites.slice(index + 1),
      ]
      : [...favorites, id];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    dispatch(ActionCreator.loadFavorites(updatedFavorites));
  },
};
