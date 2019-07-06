import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

import { PRICE_RANGE_RATE } from '../../constants';

const withPriceRange = (Component) => {
  const WithPriceRange = (props) => {
    const {
      price,
      onChange,
    } = props;
    const [currentValue, setCurrentValue] = useState(0);
    const prevValue = useRef();

    useEffect(() => {
      if (prevValue.current !== price.max) {
        setCurrentValue(currentValue || price.max);
      }

      prevValue.current = price.max;
    }, [price]);

    const _onChange = useCallback((evt) => {
      evt.persist();
      const value = Number(evt.target.value);

      if (value === price.min || value === price.max) {
        setCurrentValue(value);
        onChange(evt);
        return;
      }

      const diff = value % PRICE_RANGE_RATE;

      if (currentValue >= price.min && currentValue <= price.max) {
        setCurrentValue(value - diff);
        onChange(evt);
      }
    }, [currentValue, price]);

    return (
      <Component
        {...props}
        value={price}
        currentValue={currentValue}
        onChange={_onChange}
      />
    );
  };

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
