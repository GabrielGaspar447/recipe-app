import React from 'react';
import { useSelector } from 'react-redux';

function DetailsIngredients() {
  const recipe = useSelector((state) => state.api.recipe);
  const recKeys = Object.keys(recipe);
  const ingredients = recKeys.filter((k) => k.startsWith('strIngredient') && recipe[k]);

  return (
    <div className="details-ingredients-container">
      <h3>Ingredients</h3>
      <ul className="details-ingredient-list">
        {ingredients.map((ing, idx) => (
          <li key={ recipe[ing] } data-testid={ `${idx}-ingredient-name-and-measure` }>
            {`${recipe[ing]} - ${recipe[`strMeasure${idx + 1}`]}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailsIngredients;
