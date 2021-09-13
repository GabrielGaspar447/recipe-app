import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function DetailsStartRecipe({ spec }) {
  const history = useHistory();
  const doneRecipes = useSelector((state) => state.recipes.doneRecipes);
  const inProgressRecipes = useSelector((state) => state.recipes.inProgressRecipes);
  const { id } = useParams();
  const type = spec === 'Meal' ? 'meals' : 'cocktails';
  const page = spec === 'Meal' ? 'comidas' : 'bebidas';

  const done = doneRecipes.some((r) => r.id === id);

  return (
    <div style={ done ? { display: 'none' } : {} }>
      <button
        className="details-start-btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/${page}/${id}/in-progress`) }
      >
        {inProgressRecipes[type][id] ? 'Continuar Receita' : 'Começar Receita'}
      </button>
    </div>
  );
}

export default DetailsStartRecipe;

DetailsStartRecipe.propTypes = {
  spec: PropTypes.string.isRequired,
};
