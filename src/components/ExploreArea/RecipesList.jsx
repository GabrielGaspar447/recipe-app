import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

const twelve = 12;

function RecipesList() {
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);
  const recipesList = useSelector((state) => state.api.recipesList);

  if (recipesList === null) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (fetching) return <h3>Buscando receitas ...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
  return (
    recipesList && (
      <div className="home-cards-container">
        { recipesList.slice(0, twelve).map((rec, i) => (
          <RecipeCard key={ rec.idMeal } rec={ rec } i={ i } />))}
      </div>
    )
  );
}

export default RecipesList;
