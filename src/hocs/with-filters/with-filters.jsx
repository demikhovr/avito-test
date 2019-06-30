import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getFilterType } from '../../store/filters/selectors';
import { getFavorites } from '../../store/favorites/selectors';

const withFilters = (Component) => {
  class WithFilters extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
      const { props } = this;

      return !_.isEqual(props, nextProps);

    }

    render() {
      const { props } = this;
      const {
        products,
        favorites,
        filterType,
      } = props;
      let sortedProducts = [...products];

      if (filterType === 'isFavorite') {
        sortedProducts = products.filter((it) => favorites.includes(it.id))
      }

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
    filterType: getFilterType(state),
  });


  return connect(mapStateToProps)(WithFilters);
};

export default withFilters;
