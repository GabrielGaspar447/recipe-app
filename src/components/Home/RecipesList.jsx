import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

const twelve = 12;

// Lógica do fetch inicial está no componente Categories.jsx.

function RecipesList({ spec }) {
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
          <RecipeCard key={ rec[`str${spec}`] } rec={ rec } i={ i } spec={ spec } />))}
      </div>
    )
  );
}

export default RecipesList;

RecipesList.propTypes = {
  spec: PropTypes.string.isRequired,
};
