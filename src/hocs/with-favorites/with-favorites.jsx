import React from 'react';
import { Product } from '../../types';

const withFavorites = (Component) => {
  class WithFavorites extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: this._getFavorite(),
      };

      this._getFavorite = this._getFavorite.bind(this);
      this._onChangeFavorite = this._onChangeFavorite.bind(this);
    }

    _getFavorite() {
      const { id } = this.props;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.some(it => it === id);
    }

    _onChangeFavorite() {
      const { id } = this.props;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const index = favorites.findIndex(it => it === id);
      const isFavorites = index !== -1;
      const updatedFavorites = isFavorites
        ? [...favorites.slice(0, index),
          ...favorites.slice(index + 1)]
        : [...favorites, id];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      this.setState({
        isFavorite: !isFavorites,
      });
    }

    render() {
      const { isFavorite } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          isFavorite={isFavorite}
          onChangeFavorite={this._onChangeFavorite}
        />
      );
    }
  }

  WithFavorites.propTypes = Product;

  return WithFavorites;
};

export default withFavorites;
