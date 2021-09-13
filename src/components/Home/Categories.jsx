import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksByCategory, fetchDrinksByQuery, fetchDrinksCategories,
  fetchMealsByCategory, fetchMealsByQuery,
  fetchMealsCategories } from '../../services/API';

const five = 5;

const handleCatClick = ({ currentTarget: { value } }, setCat) => {
  setCat((state) => (state === value ? 'All' : value));
};

function Categories({ spec }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.api.categories);
  const [selCat, setCat] = useState('All');

  useEffect(() => {
    if (spec === 'Meal') {
      fetchMealsCategories(dispatch);
    } else {
      fetchDrinksCategories(dispatch);
    }
  }, [dispatch, spec]);

  useEffect(() => {
    if (spec === 'Meal') {
      if (selCat === 'All') {
        fetchMealsByQuery('s', '', dispatch);
      } else {
        fetchMealsByCategory(selCat, dispatch);
      }
    } else if (selCat === 'All') {
      fetchDrinksByQuery('s', '', dispatch);
    } else {
      fetchDrinksByCategory(selCat, dispatch);
    }
  }, [dispatch, selCat, spec]);

  return (
    categories && (
      <div className="categories-container">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setCat('All') }
        >
          All
        </button>
        { categories.slice(0, five).map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ (evt) => handleCatClick(evt, setCat) }
          >
            {strCategory}
          </button>
        ))}
      </div>
    )
  );
}

export default Categories;

Categories.propTypes = {
  spec: PropTypes.string.isRequired,
};
