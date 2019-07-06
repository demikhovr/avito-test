import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';

import { formatPrice } from '../../utils/util';
import DetailsOperation from '../../store/details/Operation/Operation';
import { getDetails, getLoadingState } from '../../store/details/selectors';
import { Product } from '../../types';
import Seller from '../Seller/Seller';
import { GEOCODE_URL } from '../../constants';

const Details = (props) => {
  const {
    details,
    isLoading,
    loadDetails,
  } = props;

  const [addressString, setAddressString] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    loadDetails(props.match.params.id);
  }, []);

  useEffect(() => {
    if (!isMounted.current && details) {
      (async () => {
        try {
          const { data } = await axios.get(`${GEOCODE_URL}&lon=${details.address.lng}&lat=${details.address.lat}`);
          setAddressString(data.display_name);
        } catch (err) {
          console.log(err);
        }
      })();
    }

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [details]);

  return (
    <div className="overlay">
      <article className="details">
        {isLoading || !details
          ? 'Loading'
          : (
            <>
              <NavLink
                className="details-close"
                to={{
                  pathname: '/',
                  search: window.location.search,
                }}
              >
                Закрыть
              </NavLink>
              <h2 className="details-title">
                {details.title}
              </h2>
              <section className="details-main">
                {/* <p className="details-date">три дня назад</p> */}
                <p className="details-price">
                  {details.price ? `${formatPrice(details.price)}₽` : null}
                </p>
                <section className="details-gallery">
                  <img src={details.pictures[0]} alt="" className="details-gallery-preview" />
                  <div className="details-gallery-thumbnails">
                    {details.pictures.slice(1).map((it, i) => {
                      const key = it + i;

                      return (
                        <img
                          key={key}
                          src={it}
                          alt=""
                          className="details-gallery-item"
                        />
                      );
                    })}
                  </div>
                </section>
                <p className="details-description">
                  {details.description}
                </p>
              </section>
              <aside className="details-aside">
                <section className="details-address">
                  <p className="details-address-text">
                    {addressString}
                  </p>
                  <div className="details-address-map" />
                </section>
                <Seller id={details.relationships.seller} />
              </aside>
            </>
          )}
      </article>
    </div>
  );
};

Details.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  details: PropTypes.shape(Product),
  isLoading: PropTypes.bool.isRequired,
  loadDetails: PropTypes.func.isRequired,
};

Details.defaultProps = {
  details: {},
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
  details: getDetails(state),
});

const mapDispatchToProps = dispatch => ({
  loadDetails: id => dispatch(DetailsOperation.loadDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
