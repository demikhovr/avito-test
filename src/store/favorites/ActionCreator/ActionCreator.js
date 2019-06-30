import {
  LOAD_FAVORITES,
} from '../ActionTypes';

export default {
  loadFavorites: favorites => ({
    type: LOAD_FAVORITES,
    payload: favorites,
  }),
};
