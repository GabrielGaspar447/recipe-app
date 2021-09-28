import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

function RecipesList() {
  const fetching = useSelector((state) => state.api.fetching);
  const recipesList = useSelector((state) => state.api.data);

  if (recipesList === null) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (fetching) return <h3>Buscando receitas ...</h3>;
  return (
    recipesList && (
      <div className="home-cards-container">
        { recipesList.map((rec, i) => (
          <RecipeCard key={ rec.idMeal } rec={ rec } i={ i } />))}
      </div>
    )
  );
}

export default RecipesList;
