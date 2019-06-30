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
      const {
        name,
        type,
        checked,
        value,
      } = evt.target;

      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
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

  return WithFormData;
};

export default withFormData;
