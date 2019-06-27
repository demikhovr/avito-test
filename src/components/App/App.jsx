import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import withFilteredItems from '../../hocs/with-filtered-items/with-filtered-items';
import withBlinkedPicture from '../../hocs/with-blinked-picture/with-blinked-picture';

import ProductList from '../ProductList/ProductList';
import ProductFilter from '../ProductFilter/ProductFilter';

import { getProducts } from '../../store/products/selectors';
import ProductsOperation from '../../store/products/Operation/Operation';
import { Product } from '../../types';

class App extends React.Component {
  componentDidMount() {
    const { loadProducts } = this.props;
    loadProducts();
  }

  render() {
    const {
      products,
      blinkedPicture,
      onChangeFilterType,
      onResetBlinking,
    } = this.props;

    return (
      <React.Fragment>
        <main className="layout centered">
          <section className="layout-main products-list">
            <ProductList
              products={products}
              blinkedPicture={blinkedPicture}
              onResetBlinking={onResetBlinking}
            />
          </section>
          <aside className="layout-sidebar">
            <ProductFilter
              onChangeFilterType={onChangeFilterType}
              onResetBlinking={onResetBlinking}
            />
          </aside>
        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(Product)),
  loadProducts: PropTypes.func.isRequired,
  blinkedPicture: PropTypes.number.isRequired,
  onChangeFilterType: PropTypes.func.isRequired,
  onResetBlinking: PropTypes.func.isRequired,
};

App.defaultProps = {
  products: [],
};

const mapStateToProps = (state, props) => ({
  ...props,
  products: getProducts(state),
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(ProductsOperation.loadProducts()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFilteredItems,
  withBlinkedPicture,
)(App);
