import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withRandomActiveItem from '../../hocs/with-random-active-item/with-random-active-item';

import ProductCard from '../ProductCard/ProductCard';

import { getLoadingState } from '../../store/products/selectors';
import { Product } from '../../types';

const ProductList = (props) => {
  const {
    isLoading,
    products,
    activeIndex,
    onResetActiveItem,
  } = props;

  return isLoading
    ? <div>Loading</div>
    : products.map((it, i) => (
      <ProductCard
        key={it.id}
        {...it}
        isActive={activeIndex === i}
        onResetActiveItem={onResetActiveItem}
      />
    ));
};

ProductList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(Product)),
  activeIndex: PropTypes.number.isRequired,
  onResetActiveItem: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  products: [],
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
});


export default connect(mapStateToProps)(
  withRandomActiveItem(ProductList),
);
