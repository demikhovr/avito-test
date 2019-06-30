import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductList from '../ProductList/ProductList';
import ProductFilter from '../ProductFilter/ProductFilter';

import ProductsOperation from '../../store/products/Operation/Operation';
import FavoritesOperation from '../../store/favorites/Operation/Operation';

class App extends React.Component {
  componentDidMount() {
    const {
      loadProducts,
      loadFavorites,
    } = this.props;

    loadProducts();
    loadFavorites();
  }

  render() {
    return (
      <React.Fragment>
        <main className="layout centered">
          <section className="layout-main products-list">
            <ProductList />
          </section>
          <aside className="layout-sidebar">
            <ProductFilter />
          </aside>
        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(ProductsOperation.loadProducts()),
  loadFavorites: () => dispatch(FavoritesOperation.loadFavorites()),
});

export default connect(null, mapDispatchToProps)(App);
