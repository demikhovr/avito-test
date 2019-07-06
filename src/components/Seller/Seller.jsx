import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SellersOperation from '../../store/sellers/Operation/Operation';
import { getLoadingState, getSeller } from '../../store/sellers/selectors';

const Seller = (props) => {
  const {
    id,
    seller,
    isLoading,
    loadSeller,
  } = props;

  useEffect(() => {
    loadSeller(id);
  }, []);

  let ratingClassName = 'details-seller-rating-average';

  if (seller && seller.rating > 4.8) {
    ratingClassName = 'details-seller-rating-good';
  } else if (seller && seller.rating < 4) {
    ratingClassName = 'details-seller-rating-bad';
  }

  return (
    <section className="details-seller">
      {isLoading || !seller
        ? 'Loading'
        : (
          <>
            <span className="details-seller-link">
              <h3 className="details-seller-name">
                {seller.name}
              </h3>
            </span>

            <p className={`details-seller-rating ${ratingClassName}`}>
              рейтинг
              <span className="details-seller-rating-val">
                {seller.rating}
              </span>
            </p>
          </>
        )}
    </section>
  );
};

Seller.propTypes = {
  id: PropTypes.string.isRequired,
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  loadSeller: PropTypes.func.isRequired,
};

Seller.defaultProps = {
  seller: {},
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
  seller: getSeller(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeller: id => dispatch(SellersOperation.loadSeller(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Seller);
