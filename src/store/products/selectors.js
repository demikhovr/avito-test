import NameSpace from '../NameSpace';

export const getLoadingState = state => state[NameSpace.PRODUCTS].isLoading;
export const getProducts = state => state[NameSpace.PRODUCTS].products;
export const getPriceRange = state => state[NameSpace.PRODUCTS].products
  .reduce((obj, it) => {
    const result = { ...obj };

    if (it.price === undefined) {
      return obj;
    }

    if (!obj.min && !obj.max) {
      result.min = it.price;
      result.max = it.price;
    }

    if (it.price > obj.max) {
      result.max = it.price;
    }

    if (it.price < obj.min) {
      result.min = it.price;
    }

    return result;
  }, {});
