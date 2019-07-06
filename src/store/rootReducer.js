import { combineReducers } from 'redux';
import NameSpace from './NameSpace';
import products from './products/Reducer/Reducer';
import favorites from './favorites/Reducer/Reducer';
import details from './details/Reducer/Reducer';
import sellers from './sellers/Reducer/Reducer';
import filters from './filters/Reducer/Reducer';
import blinking from './blinking/Reducer/Reducer';

export default combineReducers({
  [NameSpace.PRODUCTS]: products,
  [NameSpace.FAVORITES]: favorites,
  [NameSpace.DETAILS]: details,
  [NameSpace.SELLERS]: sellers,
  [NameSpace.FILTERS]: filters,
  [NameSpace.BLINKING]: blinking,
});
