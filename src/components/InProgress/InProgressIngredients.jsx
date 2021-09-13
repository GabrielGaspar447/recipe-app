import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function InProgressIngredients({ spec }) {
  const dispatch = useDispatch();
  const recipesProgress = useSelector((state) => state.recipes.inProgressRecipes);
  const recipe = useSelector((state) => state.api.recipe);
  const { id } = useParams();

  const type = spec === 'Meal' ? 'meals' : 'cocktails';
  const typeProg = recipesProgress[type];
  const recKeys = Object.keys(recipe);
  const ingredients = recKeys.filter((k) => k.startsWith('strIngredient') && recipe[k]);

  const [checkedState, setCheckedState] = useState(typeProg[id] ? [...typeProg[id]] : []);

  const handleCheck = ({ currentTarget: targ }) => {
    if (targ.checked) {
      typeProg[id] = typeProg[id] ? [...typeProg[id], targ.id] : [targ.id];
      dispatch({ type: 'UPDATE_PROGRESS', payload: recipesProgress });
      setCheckedState((state) => [...state, targ.id]);
    } else {
      typeProg[id] = typeProg[id].filter((ingId) => ingId !== targ.id);
      if (typeProg[id].length === 0) delete typeProg[id];
      dispatch({ type: 'UPDATE_PROGRESS', payload: recipesProgress });
      setCheckedState((state) => state.filter((ingId) => ingId !== targ.id));
    }
  };

  return (
    <div className="InProgress-ingredients-container">
      <h3>Ingredients</h3>
      <div className="InProgress-ingredient-list">
        {ingredients.map((ing, idx) => (
          <label
            key={ recipe[ing] }
            htmlFor={ idx + 1 }
            className={ checkedState.includes(`${idx + 1}`) ? 'ing-checked' : '' }
            data-testid={ `${idx}-ingredient-step` }
          >
            <input
              type="checkbox"
              name={ recipe[ing] }
              id={ idx + 1 }
              value={ recipe[ing] }
              checked={ checkedState.includes(`${idx + 1}`) }
              onChange={ handleCheck }
            />
            {`${recipe[ing]} - ${recipe[`strMeasure${idx + 1}`]}`}
          </label>
        ))}
      </div>
    </div>
  );
}

export default InProgressIngredients;

InProgressIngredients.propTypes = {
  spec: PropTypes.string.isRequired,
};
