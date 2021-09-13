import React from 'react';
import PropTypes from 'prop-types';

function FavoriteCategories({ setFilter }) {
  return (
    <div className="fav-cat-container">
      <button
        type="button"
        id="All"
        data-testid="filter-by-all-btn"
        onClick={ (e) => setFilter(e.currentTarget.id) }
      >
        All
      </button>
      <button
        type="button"
        id="comida"
        data-testid="filter-by-food-btn"
        onClick={ (e) => setFilter(e.currentTarget.id) }
      >
        Foods
      </button>
      <button
        type="button"
        id="bebida"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => setFilter(e.currentTarget.id) }
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteCategories;

FavoriteCategories.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
