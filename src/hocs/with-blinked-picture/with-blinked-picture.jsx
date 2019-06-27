import React from 'react';
import PropTypes from 'prop-types';
import { Product } from '../../types';
import {
  CHANGE_PIC_DELAY,
  INITIAL_PIC_INDEX,
} from '../../constants';

const withBlinkedPicture = (Component) => {
  class WithBlinkedPicture extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        lastActiveIndex: INITIAL_PIC_INDEX,
      };

      this._timerId = null;

      this._getRandomIndex = this._getRandomIndex.bind(this);
      this._onResetBlinking = this._onResetBlinking.bind(this);
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

    _onResetBlinking() {
      if (this._timerId) {
        clearTimeout(this._timerId);
        this._timerId = null;
      }

      const lastActiveIndex = this._getRandomIndex();
      this._timerId = setTimeout(() => this.setState({ lastActiveIndex }), CHANGE_PIC_DELAY);
    }

    render() {
      const { lastActiveIndex } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          blinkedPicture={lastActiveIndex}
          onResetBlinking={this._onResetBlinking}
        />
      );
    }
  }

  WithBlinkedPicture.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product)),
  };

  WithBlinkedPicture.defaultProps = {
    products: [],
  };

  return WithBlinkedPicture;
};

export default withBlinkedPicture;
