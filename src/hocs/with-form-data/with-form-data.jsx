import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import FilterActionCreator from '../../store/filters/ActionCreator/ActionCreator';

const withFormData = (Component) => {
  class WithFormData extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        formData: {},
      };

      this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
      const { changeFilters } = this.props;
      const params = new URLSearchParams(window.location.search);
      const formData = [...params.entries()]
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

      this.setState({ formData });
      changeFilters(formData);
    }

    _onChange(evt) {
      const {
        name,
        type,
        checked,
        value,
      } = evt.target;
      const { history } = this.props;

      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: type === 'checkbox' ? checked : value,
        },
      }), () => {
        const { formData } = this.state;

        history.push({
          search: `?${new URLSearchParams(formData).toString()}`,
        });
      });
    }

    render() {
      const { formData } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          formData={formData}
          onChange={this._onChange}
        />
      );
    }
  }

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
