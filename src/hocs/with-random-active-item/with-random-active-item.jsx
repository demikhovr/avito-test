import React from 'react';
import PropTypes from 'prop-types';
import { Product } from '../../types';
import {
  CHANGE_PIC_DELAY,
  INITIAL_PIC_INDEX,
} from '../../constants';

const withRandomActiveItem = (Component) => {
  class WithRandomActiveItem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        lastActiveIndex: INITIAL_PIC_INDEX,
      };

      this._getRandomIndex = this._getRandomIndex.bind(this);
      this._onResetActiveItem = this._onResetActiveItem.bind(this);
    }

    _getRandomIndex() {
      const { lastActiveIndex } = this.state;
      const { products } = this.props;
      let randomIndex;

      while (randomIndex === undefined || randomIndex === lastActiveIndex) {
        randomIndex = Math.floor(Math.random() * products.length);
      }

      return randomIndex;
    }

    _onResetActiveItem() {
      const lastActiveIndex = this._getRandomIndex();
      setTimeout(() => this.setState({ lastActiveIndex }), CHANGE_PIC_DELAY);
    }

    render() {
      const { lastActiveIndex } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          activeIndex={lastActiveIndex}
          onResetActiveItem={this._onResetActiveItem}
        />
      );
    }
  }

  WithRandomActiveItem.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product)),
  };

  WithRandomActiveItem.defaultProps = {
    products: [],
  };

  return WithRandomActiveItem;
};

export default withRandomActiveItem;
