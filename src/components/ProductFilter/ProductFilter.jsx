import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withFormData from '../../hocs/with-form-data/with-form-data';

import FilterActionCreator from '../../store/filters/ActionCreator/ActionCreator';
import { getLoadingState } from '../../store/products/selectors';

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(evt) {
    evt.preventDefault();
    const { formData } = this.props;
    const { changeFilterType } = this.props;
    changeFilterType(formData['is-favorite'] ? 'isFavorite' : null);
  }

  render() {
    const {
      isLoading,
      onChange,
    } = this.props;

    const disabled = isLoading ? 'disabled' : '';

    return (
      <form
        className="products-filter"
        onSubmit={this._onSubmit}
        onChange={onChange}
      >
        <fieldset className="products-filter-group radiogroup products-filter-favorite" disabled={disabled}>
          <input type="checkbox" name="is-favorite" id="favorite" />
          <label className="radiogroup-item" htmlFor="favorite">Показывать избранные</label>
        </fieldset>

        <fieldset className="products-filter-group" disabled={disabled}>
          <label htmlFor="category">Категория</label>
          <br />

          <select name="category" id="category">
            <option value="all">Все объявления</option>
            <option value="auto">Авто</option>
            <option value="immovable">Недвижимость</option>
            <option value="laptops">Ноутбуки</option>
            <option value="cameras">Фотоаппараты</option>
          </select>
        </fieldset>

        <fieldset className="products-filter-group radiogroup" disabled={disabled}>
          Сначала:

          <input type="radio" name="sort" value="popular" id="sort-popular" checked />
          <label className="radiogroup-item" htmlFor="sort-popular">популярные</label>

          <input type="radio" name="sort" value="cheap-first" id="sort-cheap" />
          <label className="radiogroup-item" htmlFor="sort-cheap">дешевые</label>

          <input type="radio" name="sort" value="expensive-first" id="sort-expensive" />
          <label className="radiogroup-item" htmlFor="sort-expensive">дорогие</label>
        </fieldset>

        <fieldset className="products-filter-group" disabled={disabled}>
          <label htmlFor="price-range">Максимальная цена</label>
          <br />
          <span className="price-range-min">1000</span>
          <input type="range" name="price-range" id="price-range" min="1000" max="5000" />
          <span className="price-range-max">5000</span>
        </fieldset>

        <button className="products-filter-submit" type="submit">Показать</button>
      </form>
    );
  }
}

ProductFilter.propTypes = {
  formData: PropTypes.shape({
    'is-favorite': PropTypes.bool,
  }),
  onChange: PropTypes.func.isRequired,
  changeFilterType: PropTypes.func.isRequired,
};

ProductFilter.defaultProps = {
  formData: {},
};

const mapStateToProps = (state, props) => ({
  ...props,
  isLoading: getLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  changeFilterType: type => dispatch(FilterActionCreator.changeFilterType(type))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormData,
)(ProductFilter);
