import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withFavorites from '../../hocs/with-favorites/with-favorites';

import ProductCard from '../ProductCard/ProductCard';

import { getLoadingState } from '../../store/products/selectors';
import { Product } from '../../types';
import { getFilterType } from '../../store/filters/selectors';

const ProductList = (props) => {
  const {
    isLoading,
    products,
    favorites,
    blinkedPicture,
    filterType,
    checkFavorite,
    onChangeFavorite,
    onResetBlinking,
  } = props;

  return isLoading
    ? <div>Loading</div>
    : products.map((it, i) => {
      const isFilterByFavorite = filterType === 'isFavorite';
      const isFavorite = checkFavorite(it.id);
      const inFavorites = favorites.includes(it.id);

      if (isFilterByFavorite && (!isFavorite || !inFavorites)) {
        return null;
      }


      return (
        <ProductCard
          key={it.id}
          {...it}
          isFavorite={isFavorite}
          onChangeFavorite={onChangeFavorite}
          hasBlinking={blinkedPicture === i}
          onResetBlinking={onResetBlinking}
        />
      );
    });
};

ProductList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(Product)),
  favorites: PropTypes.arrayOf(PropTypes.string),
  blinkedPicture: PropTypes.number.isRequired,
  filterType: PropTypes.string,
  checkFavorite: PropTypes.func.isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
  onResetBlinking: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  products: [],
  favorites: [],
  filterType: null,
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
  filterType: getFilterType(state),
});

export default compose(
  connect(mapStateToProps),
  withFavorites
)(ProductList);
