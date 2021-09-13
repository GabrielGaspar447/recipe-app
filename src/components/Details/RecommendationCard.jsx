import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard({ rec, idx, spec }) {
  const name = spec === 'Meal' ? 'strDrink' : 'strMeal';
  const cat = spec === 'Meal' ? 'strAlcoholic' : 'strCategory';
  const thumb = spec === 'Meal' ? 'strDrinkThumb' : 'strMealThumb';

  return (
    <div data-testid={ `${idx}-recomendation-card` } className="recommendation-card">
      <img src={ rec[thumb] } alt="card-thumbnail" />
      <p className="reccomendation-cat">{rec[cat]}</p>
      <p className="reccomendation-title" data-testid={ `${idx}-recomendation-title` }>
        {rec[name]}
      </p>
    </div>
  );
}

export default RecommendationCard;

RecommendationCard.propTypes = {
  rec: PropTypes.objectOf(PropTypes.string).isRequired,
  idx: PropTypes.number.isRequired,
  spec: PropTypes.string.isRequired,
};
