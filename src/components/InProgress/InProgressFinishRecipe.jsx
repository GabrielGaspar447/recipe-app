import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';

const data = new Date();

const createDoneObject = (r, spec) => (
  {
    id: spec === 'Meal' ? r.idMeal : r.idDrink,
    type: spec === 'Meal' ? 'comida' : 'bebida',
    area: r.strArea ? r.strArea : '',
    category: r.strCategory ? r.strCategory : '',
    alcoholicOrNot: spec === 'Meal' ? '' : r.strAlcoholic,
    name: spec === 'Meal' ? r.strMeal : r.strDrink,
    image: spec === 'Meal' ? r.strMealThumb : r.strDrinkThumb,
    doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
    tags: r.strTags ? r.strTags.split(',') : [],
  }
);

function InProgressFinishRecipe({ spec }) {
  const type = spec === 'Meal' ? 'meals' : 'cocktails';
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.api.data);
  const recProgress = useSelector((state) => state.recipes.inProgressRecipes[type][id]);
  const doneRecipes = useSelector((state) => state.recipes.doneRecipes);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const ingSteps = Array.from(document.querySelectorAll('input[type=checkbox'));
    const allChecked = ingSteps.every((c) => (c.checked));
    setAllDone(allChecked);
  }, [recProgress]);

  const finishRecipe = () => {
    const payload = createDoneObject(recipe, spec);
    dispatch({ type: 'FINISH_RECIPE', payload });
    history.push('/receitas-feitas');
  };

  if (doneRecipes.some((r) => r.id === id)) return <Redirect to="/receitas-feitas" />;
  return (
    <div>
      <button
        className="InProgress-finish-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allDone }
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default InProgressFinishRecipe;

InProgressFinishRecipe.propTypes = {
  spec: PropTypes.string.isRequired,
};
