import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { useDispatch, useSelector } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const threeSeconds = 3000;

function FavoriteCard({ r, i }) {
  const { protocol, host, pathname } = window.location;
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);
  const topText = r.type === 'comida' ? `${r.area} - ${r.category}` : r.alcoholicOrNot;
  const page = r.type === 'comida' ? 'comidas' : 'bebidas';

  const shareRecipe = ({ currentTarget }) => {
    copy(`${protocol}//${host}${pathname}/#/${page}/${r.id}`);
    const copyMsg = currentTarget.previousSibling;
    copyMsg.classList.toggle('invisible');
    setTimeout(() => copyMsg.classList.toggle('invisible'), threeSeconds);
  };

  const unFav = () => {
    const payload = favoriteRecipes.filter((rec) => rec.id !== r.id);
    dispatch({ type: 'UPDATE_FAVORITES', payload });
  };

  return (
    <div className="fav-rec-card">
      <div className="fav-card-img-container">
        <Link to={ `/${page}/${r.id}` }>
          <img
            src={ r.image }
            alt="recipe-thumb"
            className="fav-card-img"
            data-testid={ `${i}-horizontal-image` }
          />
        </Link>
      </div>
      <div className="fav-card-info">
        <div className="fav-card-texts">
          <p data-testid={ `${i}-horizontal-top-text` } className="fav-card-cat">
            {topText}
          </p>
          <Link to={ `/${page}/${r.id}` }>
            <p data-testid={ `${i}-horizontal-name` } className="fav-card-tit">
              {r.name}
            </p>
          </Link>
        </div>
        <div className="fav-btns-container">
          <span className="fav-copyMsg invisible">Link copiado!</span>
          <button type="button" className="fav-card-share-btn" onClick={ shareRecipe }>
            <img
              src={ shareIcon }
              alt="share-icon"
              data-testid={ `${i}-horizontal-share-btn` }
            />
          </button>
          <button type="button" onClick={ unFav }>
            <img
              src={ blackHeartIcon }
              alt="favorite button"
              data-testid={ `${i}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;

FavoriteCard.propTypes = {
  r: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ])).isRequired,
  i: PropTypes.number.isRequired,
};
