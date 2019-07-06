import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductList from '../ProductList/ProductList';
import ProductFilter from '../ProductFilter/ProductFilter';
import Details from '../Details/Details';

import ProductsOperation from '../../store/products/Operation/Operation';
import FavoritesOperation from '../../store/favorites/Operation/Operation';

const App = (props) => {
  const { loadProducts, loadFavorites } = props;

  useEffect(() => {
    loadProducts();
    loadFavorites();
  }, []);

  return (
    <>
      <main className="layout centered">
        <section className="layout-main products-list">
          <ProductList />
        </section>
        <aside className="layout-sidebar">
          <ProductFilter />
        </aside>
      </main>
      <Switch>
        <Route path="/details/:id" component={Details} />
      </Switch>
    </>
  );
};

App.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(ProductsOperation.loadProducts()),
  loadFavorites: () => dispatch(FavoritesOperation.loadFavorites()),
});

export default connect(null, mapDispatchToProps)(App);
