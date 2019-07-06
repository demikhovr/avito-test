import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  GEOCODE_URL,
  GEOCODE_API_KEY,
} from '../../constants';
import { Product } from '../../types';

const withCoordinates = (Component) => {
  const WithCoordinates = (props) => {
    const [addressString, setAddressString] = useState(null);
    const isMounted = useRef(false);
    const { address: { lat, lng } } = props;

    useEffect(() => {
      if (!isMounted.current) {
        (async () => {
          try {
            const { data } = await axios.get(`${GEOCODE_URL}&apikey=${GEOCODE_API_KEY}&geocode=${lng},${lat}`);
            const { GeoObject } = data.response.GeoObjectCollection.featureMember[0];
            setAddressString(`${GeoObject.description}, ${GeoObject.name}`);
          } catch (err) {
            console.log(err);
          }
        })();
      }

      isMounted.current = true;

      return () => {
        isMounted.current = false;
      };
    }, []);

    return (
      <Component
        {...props}
        addressString={addressString}
      />
    );
  };


  WithCoordinates.propTypes = Product;

  return WithCoordinates;
};

export default withCoordinates;
