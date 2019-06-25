import NameSpace from '../NameSpace';

export const getLoadingState = state => state[NameSpace.PRODUCTS].isLoading;
export const getProducts = state => state[NameSpace.PRODUCTS].products;
