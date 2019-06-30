import React from 'react';
import PropTypes from 'prop-types';

const InputRange = (props) => {
  const {
    id,
    name,
    label,
    value,
    className,
    currentValue,
    onChange,
  } = props;

  return (
    <React.Fragment>
      <label htmlFor={id}>
        {label}
        &nbsp;
        <span className={`${className}-current`}>
          {currentValue}
        </span>
        <br />
        <span className={`${className}-min`}>
          {value.min}
        </span>
        <input
          type="range"
          id={id}
          name={name}
          min={value.min}
          max={value.max}
          value={currentValue}
          onChange={onChange}
        />
        <span className={`${className}-max`}>
          {value.max}
        </span>
      </label>
    </React.Fragment>
  );
};

InputRange.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  className: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputRange;
