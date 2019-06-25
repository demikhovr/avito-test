import React from 'react';

const withFormData = (Component) => {
  class WithFormData extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        formData: {},
      };

      this._onChange = this._onChange.bind(this);
    }

    _onChange(evt) {
      evt.persist();
      const {
        name,
        type,
        checked,
        value,
      } = evt.target;

      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: type === 'checkbox' || type === 'radio' ? checked : value,
        },
      }));
    }

    render() {
      const { formData } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          onChange={this._onChange}
          formData={formData}
        />
      );
    }
  }

  return WithFormData;
};

export default withFormData;
