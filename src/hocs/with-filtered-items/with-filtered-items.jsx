import React from 'react';

const withFilteredItems = (Component) => {
  class WithFilteredItems extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        filterType: null,
      };

      this._onChangeFilterType = this._onChangeFilterType.bind(this);
    }

    _onChangeFilterType(filterType) {
      this.setState({ filterType });
    }

    render() {
      const { filterType } = this.state;
      const { props } = this;
      const { products } = props;
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let sortedProducts = products;

      if (filterType === 'isFavorite') {
        sortedProducts = products.filter(it => favorites.includes(it.id));
      }

      return (
        <Component
          {...props}
          onChangeFilterType={this._onChangeFilterType}
          products={sortedProducts}
        />
      );
    }
  }

  return WithFilteredItems;
};

export default withFilteredItems;
