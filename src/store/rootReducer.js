import { combineReducers } from 'redux';
import NameSpace from './NameSpace';
import products from './products/Reducer/Reducer';

export default combineReducers({
  [NameSpace.PRODUCTS]: products,
});
