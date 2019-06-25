import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import withCoordinates from '../../hocs/with-coordinates/with-coordinates';
import withFavorites from '../../hocs/with-favorites/with-favorites';

import Picture from '../Picture/Picture';

import { formatPrice } from '../../utils/util';
import { Product } from '../../types';

const ProductCard = (props) => {
  const {
    pictures,
    price,
    title,
    addressString,
    isFavorite,
    isActive,
    onChangeFavorite,
    onResetActiveItem,
  } = props;
  const favoriteClass = isFavorite ? 'product-favorite--active' : '';

  return (
    <article className="products-list-item product">
      <div className="product-pic">
        <a href="#1" className="product-pic-number">
          {pictures.length}
        </a>
        <Picture
          pictures={pictures}
          isActive={isActive}
          onResetActiveItem={onResetActiveItem}
        />
      </div>
      <div className="product-description">
        <button
          className={`product-favorite ${favoriteClass}`}
          type="button"
          onClick={onChangeFavorite}
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
  addressString: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
  onResetActiveItem: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  addressString: '',
};

export default compose(
  withCoordinates,
  withFavorites,
)(ProductCard);
