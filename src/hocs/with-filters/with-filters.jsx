import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { makeSortFunction } from '../../store/products/util';
import { getFavorites } from '../../store/favorites/selectors';
import { getFilters } from '../../store/filters/selectors';

import {
  Filter,
  Category,
} from '../../constants';

const withFilters = (Component) => {
  class WithFilters extends React.Component {
    shouldComponentUpdate(nextProps) {
      const { props } = this;

      return !_.isEqual(props, nextProps);
    }

    render() {
      const { props } = this;
      const {
        products,
        favorites,
        filters,
      } = props;

      const sortedProducts = [...products]
        .filter((it) => {
          let isFavorite = true;
          let isFilteredByPrice = true;
          let isFilteredByCategory = true;

          if (filters[Filter.FAVORITES]) {
            isFavorite = favorites.includes(it.id);
          }

          if (filters[Filter.CATEGORY] && Category[filters[Filter.CATEGORY].toUpperCase()]) {
            isFilteredByCategory = it.category === filters[Filter.CATEGORY];
          }

          if (filters[Filter.PRICE]) {
            isFilteredByPrice = it.price <= Number(filters[Filter.PRICE]);
          }

          return isFavorite && isFilteredByPrice && isFilteredByCategory;
        })
        .sort(makeSortFunction(filters.sort));

      return (
        <Component
          {...props}
          products={sortedProducts}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => ({
    ...props,
    favorites: getFavorites(state),
    filters: getFilters(state),
  });


  return connect(mapStateToProps)(WithFilters);
};

export default withFilters;
