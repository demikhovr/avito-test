import React from 'react';
import axios from 'axios';

import { Product } from '../../types';
import {
  GEOCODE_URL,
  GEOCODE_API_KEY,
} from '../../constants';

const withCoordinates = (Component) => {
  class WithCoordinates extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        addressString: null,
      };
    }

    componentDidMount() {
      const { address: { lat, lng } } = this.props;

      axios.get(`${GEOCODE_URL}&apikey=${GEOCODE_API_KEY}&geocode=${lng},${lat}`)
        .then((response) => {
          const { data } = response;
          const { GeoObject } = data.response.GeoObjectCollection.featureMember[0];

          this.setState({
            addressString: `${GeoObject.description}, ${GeoObject.name}`,
          });
        })
        .catch(() => {});
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
