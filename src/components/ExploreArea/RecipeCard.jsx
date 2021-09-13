import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ rec, i }) {
  return (
    <Link to={ `/comidas/${rec.idMeal}` } className="card-link">
      <div className="home-cards-container">
        <div className="home-r-card" data-testid={ `${i}-recipe-card` }>
          <img
            src={ rec.strMealThumb }
            alt="card-thumbnail"
            data-testid={ `${i}-card-img` }
          />
          <p data-testid={ `${i}-card-name` }>{rec.strMeal}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  rec: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};
