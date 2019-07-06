import React from 'react';
import PropTypes from 'prop-types';

import { PRICE_RANGE_RATE } from '../../constants';

const withPriceRange = (Component) => {
  class WithPriceRange extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        currentValue: 0,
      };
    }

    /* eslint-disable react/no-did-update-set-state */
    componentDidUpdate(prevProps) {
      const {
        price,
        currentValue,
      } = this.props;

      if (prevProps.price.max !== price.max) {
        this.setState({
          currentValue: currentValue || price.max,
        });
      }
    }
    /* eslint-enable react/no-did-update-set-state */

    _onChange = (evt) => {
      evt.persist();
      const {
        price,
        onChange,
      } = this.props;
      const value = Number(evt.target.value);

      if (value === price.min || value === price.max) {
        this.setState({
          currentValue: value,
        }, () => onChange(evt));

        return;
      }

      const diff = value % PRICE_RANGE_RATE;
      const currentValue = value - diff;

      if (currentValue >= price.min && currentValue <= price.max) {
        this.setState({
          currentValue,
        }, () => onChange(evt));
      }
    }

    render() {
      const { currentValue } = this.state;
      const { props } = this;
      const { price } = props;

      return (
        <Component
          {...props}
          value={price}
          currentValue={currentValue}
          onChange={evt => this._onChange(evt)}
        />
      );
    }
  }

  WithPriceRange.propTypes = {
    currentValue: PropTypes.number,
    price: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  WithPriceRange.defaultProps = {
    currentValue: 0,
  };

  return WithPriceRange;
};

export default withPriceRange;
