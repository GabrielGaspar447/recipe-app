import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RecipeCard from './RecipeCard';

function RecipesList({ spec }) {
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);
  const recipesList = useSelector((state) => state.api.data);

  if (fetching) return <h3>Buscando receitas ...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente.</h3>;
  return (
    recipesList && (
      <div className="home-cards-container">
        { recipesList.map((rec, i) => (
          <RecipeCard key={ rec[`str${spec}`] } rec={ rec } i={ i } spec={ spec } />))}
      </div>
    )
  );
}

export default RecipesList;

RecipesList.propTypes = {
  spec: PropTypes.string.isRequired,
};
