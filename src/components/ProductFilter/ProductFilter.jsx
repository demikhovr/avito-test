import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withFormData from '../../hocs/with-form-data/with-form-data';
import withPriceChange from '../../hocs/with-price-range/with-price-range';

import InputRange from '../InputRange/InputRange';

import FilterActionCreator from '../../store/filters/ActionCreator/ActionCreator';
import { getLoadingState, getPriceRange } from '../../store/products/selectors';
import { Filter, SortingType } from '../../constants';

const InputRangeWrapped = withPriceChange(InputRange);

const ProductFilter = (props) => {
  const {
    isLoading,
    formData,
    priceRange,
    onChange,
    changeFilters,
  } = props;

  const onSubmit = useCallback((evt) => {
    evt.preventDefault();
    changeFilters(formData);
  }, [formData]);

  const disabled = isLoading ? 'disabled' : '';
  /* There's a bug with select and label */
  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <form
      className="products-filter"
      onSubmit={onSubmit}
    >
      <fieldset
        className="products-filter-group radiogroup products-filter-favorite"
        disabled={disabled}
      >
        <label htmlFor="favorite">
          <input
            type="checkbox"
            name="is-favorite"
            id="favorite"
            onChange={onChange}
            checked={formData[Filter.FAVORITES] || false}
          />
          <span className="radiogroup-item">Показывать избранные</span>
        </label>
      </fieldset>

      <fieldset
        className="products-filter-group"
        disabled={disabled}
      >
        <label htmlFor="category">
          Категория
          <br />

          <select
            name="category"
            id="category"
            onChange={onChange}
            value={formData[Filter.CATEGORY]}
          >
            <option value="all">Все объявления</option>
            <option value="auto">Авто</option>
            <option value="immovable">Недвижимость</option>
            <option value="laptops">Ноутбуки</option>
            <option value="cameras">Фотоаппараты</option>
          </select>
        </label>
      </fieldset>

      <fieldset
        className="products-filter-group radiogroup"
        disabled={disabled}
      >
        Сначала:

        <label htmlFor="sort-popular">
          <input
            type="radio"
            name="sort"
            value="popular"
            id="sort-popular"
            onChange={onChange}
            checked={formData[Filter.SORT] === SortingType.POPULAR}
          />
          <span className="radiogroup-item">популярные</span>
        </label>

        <label htmlFor="sort-cheap">
          <input
            type="radio"
            name="sort"
            value="cheap-first"
            id="sort-cheap"
            onChange={onChange}
            checked={formData[Filter.SORT] === SortingType.CHEAP_FIRST}
          />
          <span className="radiogroup-item">дешевые</span>
        </label>

        <label htmlFor="sort-expensive">
          <input
            type="radio"
            name="sort"
            value="expensive-first"
            id="sort-expensive"
            onChange={onChange}
            checked={formData[Filter.SORT] === SortingType.EXPENSIVE_FIRST}
          />
          <span className="radiogroup-item">дорогие</span>
        </label>
      </fieldset>

      <fieldset
        className="products-filter-group"
        disabled={disabled}
      >
        <InputRangeWrapped
          id="price-change"
          name="price-change"
          label="Максимальная цена"
          className="price-change"
          price={priceRange}
          onChange={onChange}
          currentValue={Number(formData[Filter.PRICE] ? formData[Filter.PRICE] : 0)}
        />
      </fieldset>

      <button className="products-filter-submit" type="submit">Показать</button>
    </form>
  );
};

ProductFilter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  formData: PropTypes.shape({
    'is-favorite': PropTypes.bool,
    sort: PropTypes.string,
    'price-change': PropTypes.string,
    category: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  changeFilters: PropTypes.func.isRequired,
};

ProductFilter.defaultProps = {
  formData: {},
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
  priceRange: getPriceRange(state),
});

const mapDispatchToProps = dispatch => ({
  changeFilters: filters => dispatch(FilterActionCreator.changeFilters(filters)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormData,
)(ProductFilter);
