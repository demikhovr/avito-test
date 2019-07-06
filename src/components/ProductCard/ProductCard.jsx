import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    onChangeFavorite,
  } = props;
  const isFavorite = favorites.includes(id);
  const favoriteClass = isFavorite ? 'product-favorite--active' : '';
  const handleFavoriteBtnClick = useCallback(() => onChangeFavorite(id), []);

  return (
    <article className="products-list-item product">
      <div className="product-pic">
        <NavLink
          className="product-pic-number"
          to={{
            pathname: `/details/${id}`,
            search: window.location.search,
          }}
        >
          {pictures.length}
        </NavLink>
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
          <NavLink to={{
            pathname: `/details/${id}`,
            search: window.location.search,
          }}
          >
            {title}
          </NavLink>
        </h3>
        <p className="product-price">
          {price ? `${formatPrice(price)}₽` : null}
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
  onChangeFavorite: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  products: [],
  favorites: [],
};

const mapStateToProps = (state, props) => ({
  ...props,
  favorites: getFavorites(state),
});

const mapDispatchToProps = dispatch => ({
  onChangeFavorite: id => dispatch(FavoritesOperation.changeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
