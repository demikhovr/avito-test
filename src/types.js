import PropTypes from 'prop-types';

export const Address = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export const Product = {
  address: PropTypes.shape(Address).isRequired,
  bodyType: PropTypes.string,
  category: PropTypes.string.isRequired,
  gearbox: PropTypes.string,
  id: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number,
  relationships: PropTypes.shape({
    seller: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number,
};
