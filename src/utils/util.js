import {
  PRICE_LENGTH_TO_FORMAT,
  PRICE_LOCALE,
} from '../constants';

export const formatPrice = price => (`${price}`.length >= PRICE_LENGTH_TO_FORMAT
  ? price.toLocaleString(PRICE_LOCALE)
  : price);

export const getRandomIndex = (arr, lastIndex) => {
  if (arr.length === 1) {
    return 0;
  }

  let randomIndex;

  while (randomIndex === undefined || randomIndex === lastIndex) {
    randomIndex = Math.floor(Math.random() * arr.length);
  }

  return randomIndex;
}
