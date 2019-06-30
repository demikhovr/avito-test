import React from 'react';
import axios from 'axios';

import {
  GEOCODE_URL,
  GEOCODE_API_KEY,
} from '../../constants';
import { Product } from '../../types';

const withCoordinates = (Component) => {
  class WithCoordinates extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        addressString: null,
      };

      this._mounted = true;
    }

    componentDidMount() {
      const { address: { lat, lng } } = this.props;

      axios.get(`${GEOCODE_URL}&apikey=${GEOCODE_API_KEY}&geocode=${lng},${lat}`)
        .then((response) => {
          if (!this._mounted) {
            return;
          }

          const { data } = response;
          const { GeoObject } = data.response.GeoObjectCollection.featureMember[0];

          this.setState({
            addressString: `${GeoObject.description}, ${GeoObject.name}`,
          });
        })
        .catch(() => {});
    }

    componentWillUnmount() {
      this._mounted = false;
    }

    render() {
      const { addressString } = this.state;
      const { props } = this;

      return (
        <Component
          {...props}
          addressString={addressString}
        />
      );
    }
  }


  WithCoordinates.propTypes = Product;

  return WithCoordinates;
};

export default withCoordinates;
