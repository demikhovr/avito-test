import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withFilters from '../../hocs/with-filters/with-filters';

import ProductCard from '../ProductCard/ProductCard';

import {
  getProducts,
  getLoadingState,
} from '../../store/products/selectors';
import BlinkingActionCreator from '../../store/blinking/ActionCreator/ActionCreator';
import { Product } from '../../types';
import { INITIAL_PIC_INDEX } from '../../constants';

const ProductList = (props) => {
  const {
    isLoading,
    products,
    changeBlinkingProductIndex,
  } = props;

  useEffect(() => {
    changeBlinkingProductIndex(INITIAL_PIC_INDEX);
  }, []);

  return isLoading
    ? <div>Loading</div>
    : products.map((it, index) => (
      <ProductCard
        key={it.id}
        {...it}
        index={index}
        products={products}
      />
    ));
}

ProductList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(Product)),
  changeBlinkingProductIndex: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  products: [],
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
  products: getProducts(state),
});

const mapDispatchToProps = dispatch => ({
  changeBlinkingProductIndex: index => dispatch(BlinkingActionCreator.changeIndex(index)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFilters,
)(ProductList);
