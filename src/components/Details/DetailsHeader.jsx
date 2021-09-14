import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const threeSeconds = 3000;

const createFavObject = (r, spec) => (
  {
    id: spec === 'Meal' ? r.idMeal : r.idDrink,
    type: spec === 'Meal' ? 'comida' : 'bebida',
    area: r.strArea ? r.strArea : '',
    category: r.strCategory ? r.strCategory : '',
    alcoholicOrNot: spec === 'Meal' ? '' : r.strAlcoholic,
    name: spec === 'Meal' ? r.strMeal : r.strDrink,
    image: spec === 'Meal' ? r.strMealThumb : r.strDrinkThumb,
  }
);

function DetailsHeader({ spec }) {
  const { id } = useParams();
  const { protocol, host, pathname } = window.location;
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.api.recipe);
  const favRecipes = useSelector((state) => state.recipes.favoriteRecipes);

  const page = spec === 'Meal' ? 'comidas' : 'bebidas';
  const title = recipe[`str${spec}`];
  const subtitle = recipe[spec === 'Meal' ? 'strCategory' : 'strAlcoholic'];
  const isFavorite = favRecipes.some((r) => r.id === id);
  const heartIcon = isFavorite ? blackHeartIcon : whiteHeartIcon;

  const shareRecipe = () => {
    copy(`${protocol}//${host}${pathname}/#/${page}/${id}`);
    const copyMsg = document.querySelector('.details-copyMsg');
    copyMsg.classList.toggle('invisible');
    setTimeout(() => copyMsg.classList.toggle('invisible'), threeSeconds);
  };

  const toggleFav = () => {
    if (isFavorite) {
      const payload = favRecipes.filter((r) => r.id !== id);
      dispatch({ type: 'UPDATE_FAVORITES', payload });
    } else {
      const newFav = createFavObject(recipe, spec);
      dispatch({ type: 'UPDATE_FAVORITES', payload: [...favRecipes, newFav] });
    }
  };

  return (
    <div className="details-header-container">
      <div className="details-header-title">
        <h2 data-testid="recipe-title">{title}</h2>
        <h5 data-testid="recipe-category">{subtitle}</h5>
      </div>
      <div className="details-header-buttons">
        <span className="details-copyMsg invisible">Link copiado!</span>
        <button type="button" onClick={ shareRecipe }>
          <img src={ shareIcon } alt="share button" data-testid="share-btn" />
        </button>
        <button type="button" onClick={ toggleFav }>
          <img src={ heartIcon } alt="favorite button" data-testid="favorite-btn" />
        </button>
      </div>
    </div>
  );
}

export default DetailsHeader;

DetailsHeader.propTypes = {
  spec: PropTypes.string.isRequired,
};
