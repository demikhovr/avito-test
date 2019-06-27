import React from 'react';

const withFavorites = (Component) => {
  class WithFavorites extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        favorites: [],
      };

      this._checkFavorite = this._checkFavorite.bind(this);
      this._onChangeFavorite = this._onChangeFavorite.bind(this);
    }

    componentDidMount() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.setState({ favorites });
    }

    _checkFavorite(id) {
      const { favorites } = this.state;
      return favorites.some(it => it === id);
    }

    _onChangeFavorite(id) {
      const { favorites } = this.state;
      const index = favorites.findIndex(it => it === id);
      const inFavorites = index !== -1;
      const updatedFavorites = inFavorites
        ? [...favorites.slice(0, index),
          ...favorites.slice(index + 1)]
        : [...favorites, id];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      this.setState({
        favorites: updatedFavorites,
      });
    }

    render() {
      const { favorites } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          favorites={favorites}
          checkFavorite={this._checkFavorite}
          onChangeFavorite={this._onChangeFavorite}
        />
      );
    }
  }

  return WithFavorites;
};

export default withFavorites;
