import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductCard from '../ProductCard/ProductCard';

import { getLoadingState } from '../../store/products/selectors';
import { Product } from '../../types';

const ProductList = (props) => {
  const {
    isLoading,
    products,
    blinkedPicture,
    onResetBlinking,
  } = props;

  return isLoading
    ? <div>Loading</div>
    : products.map((it, i) => (
      <ProductCard
        key={it.id}
        {...it}
        hasBlinking={blinkedPicture === i}
        onResetBlinking={onResetBlinking}
      />
    ));
};

ProductList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(Product)),
  blinkedPicture: PropTypes.number.isRequired,
  onResetBlinking: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  products: [],
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
});

export default connect(mapStateToProps)(ProductList);
