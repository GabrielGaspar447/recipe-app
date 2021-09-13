import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ rec, i, spec }) {
  const URL = spec === 'Meal' ? `/comidas/${rec.idMeal}` : `/bebidas/${rec.idDrink}`;
  const name = spec === 'Meal' ? 'strMeal' : 'strDrink';
  const thumb = spec === 'Meal' ? 'strMealThumb' : 'strDrinkThumb';
  return (
    <Link to={ URL } className="card-link">
      <div className="home-cards-container">
        <div className="home-r-card" data-testid={ `${i}-recipe-card` }>
          <img src={ rec[thumb] } alt="card-thumbnail" data-testid={ `${i}-card-img` } />
          <p data-testid={ `${i}-card-name` }>{rec[name]}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  rec: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
  spec: PropTypes.string.isRequired,
};
