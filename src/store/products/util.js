import { SortingType } from '../../constants';

export const adaptProductData = data => ({
  address: data.address,
  bodyType: data.body_type,
  category: data.category,
  gearbox: data.gearbox,
  id: data.id,
  pictures: data.pictures,
  price: data.price,
  relationships: data.relationships,
  title: data.title,
  year: data.year,
});

export const makeSortFunction = category => (a, b) => {
  if (category === SortingType.CHEAP_FIRST) {
    return a.price - b.price;
  }

  if (category === SortingType.EXPENSIVE_FIRST) {
    return b.price - a.price;
  }

  if (category === SortingType.POPULAR) {
    return true;
  }

  return true;
};
