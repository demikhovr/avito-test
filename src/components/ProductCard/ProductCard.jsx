import React from 'react';
import PropTypes from 'prop-types';

import withCoordinates from '../../hocs/with-coordinates/with-coordinates';

import Picture from '../Picture/Picture';

import { formatPrice } from '../../utils/util';
import { Product } from '../../types';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  _onFavoriteClick() {
    const {
      id,
      onChangeFavorite,
    } = this.props;
    onChangeFavorite(id);
  }


  render() {
    const {
      pictures,
      price,
      title,
      addressString,
      isFavorite,
      hasBlinking,
      onResetBlinking,
    } = this.props;
    const favoriteClass = isFavorite ? 'product-favorite--active' : '';

    return (
      <article className="products-list-item product">
        <div className="product-pic">
          <a href="#1" className="product-pic-number">
            {pictures.length}
          </a>
          <Picture
            pictures={pictures}
            hasBlinking={hasBlinking}
            onResetBlinking={onResetBlinking}
          />
        </div>
        <div className="product-description">
          <button
            className={`product-favorite ${favoriteClass}`}
            type="button"
            onClick={this._onFavoriteClick}
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
  }
};

ProductCard.propTypes = {
  ...Product,
  addressString: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired,
  hasBlinking: PropTypes.bool.isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
  onResetBlinking: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
  addressString: '',
};

export default withCoordinates(ProductCard);
