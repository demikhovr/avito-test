import {
  PRICE_LENGTH_TO_FORMAT,
  PRICE_LOCALE,
} from '../constants';

export const formatPrice = price => (`${price}`.length >= PRICE_LENGTH_TO_FORMAT
  ? price.toLocaleString(PRICE_LOCALE)
  : price);
