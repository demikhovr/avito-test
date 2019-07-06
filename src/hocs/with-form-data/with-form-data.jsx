import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import FilterActionCreator from '../../store/filters/ActionCreator/ActionCreator';

const withFormData = (Component) => {
  const WithFormData = (props) => {
    const { changeFilters, history } = props;
    const [formData, setFormData] = useState({});

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const formDataFromParams = [...params.entries()]
        .reduce((obj, [key, value]) => {
          let val = value;

          if (key === 'is-favorite') {
            val = value === 'true';
          }

          return {
            ...obj,
            [key]: val,
          };
        }, {});

      setFormData(formDataFromParams);
      changeFilters(formDataFromParams);
    }, []);

    const onChange = useCallback((evt) => {
      const {
        name,
        type,
        checked,
        value,
      } = evt.target;
      const newFormData = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      };

      setFormData(newFormData);
      history.push({
        search: `?${new URLSearchParams(newFormData).toString()}`,
      });
    }, [formData]);

    return (
      <Component
        {...props}
        formData={formData}
        onChange={onChange}
      />
    );
  };

  WithFormData.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    changeFilters: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = dispatch => ({
    changeFilters: filters => dispatch(FilterActionCreator.changeFilters(filters)),
  });

  return connect(null, mapDispatchToProps)(withRouter(WithFormData));
};

export default withFormData;
