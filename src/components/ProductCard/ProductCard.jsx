import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withCoordinates from '../../hocs/with-coordinates/with-coordinates';

import Picture from '../Picture/Picture';

import FavoritesOperation from '../../store/favorites/Operation/Operation';
import { getFavorites } from '../../store/favorites/selectors';

import { formatPrice } from '../../utils/util';
import { Product } from '../../types';

const ProductCard = (props) => {
  const {
    id,
    pictures,
    price,
    title,
    index,
    products,
    favorites,
    addressString,
    onChangeFavorite,
  } = props;
  const isFavorite = favorites.includes(id);
  const favoriteClass = isFavorite ? 'product-favorite--active' : '';
  const handleFavoriteBtnClick = useCallback(() => onChangeFavorite(id), []);

  return (
    <article className="products-list-item product">
      <div className="product-pic">
        <a href="#1" className="product-pic-number">
          {pictures.length}
        </a>
        <Picture
          index={index}
          pictures={pictures}
          products={products}
        />
      </div>
      <div className="product-description">
        <button
          className={`product-favorite ${favoriteClass}`}
          type="button"
          onClick={handleFavoriteBtnClick}
        >
          Добавить в избранное
        </button>
        <h3 className="product-title">
          <a href="#1">
            {title}
          </a>
        </h3>
        <p className="product-price">
          {price ? `${formatPrice(price)}₽` : null}
        </p>
        <p className="product-address">
          {addressString}
        </p>
        <p className="product-date" />
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  ...Product,
  index: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(Product)),
  favorites: PropTypes.arrayOf(PropTypes.string),
  addressString: PropTypes.string,
  onChangeFavorite: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  products: [],
  favorites: [],
  addressString: '',
};

const mapStateToProps = (state, props) => ({
  ...props,
  favorites: getFavorites(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeFavorite: id => dispatch(FavoritesOperation.changeFavorite(id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withCoordinates,
)(ProductCard);
