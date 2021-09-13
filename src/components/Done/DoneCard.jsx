import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

const threeSeconds = 3000;

function DoneCard({ r, i }) {
  const topText = r.type === 'comida' ? `${r.area} - ${r.category}` : r.alcoholicOrNot;
  const page = r.type === 'comida' ? 'comidas' : 'bebidas';

  const shareRecipe = ({ currentTarget }) => {
    copy(`http://localhost:3000/${page}/${r.id}`);
    const copyMsg = currentTarget.previousSibling;
    copyMsg.classList.toggle('invisible');
    setTimeout(() => copyMsg.classList.toggle('invisible'), threeSeconds);
  };

  return (
    <div className="done-rec-card">
      <div className="done-card-img-container">
        <Link to={ `/${page}/${r.id}` }>
          <img
            src={ r.image }
            alt="recipe-thumb"
            className="done-card-img"
            data-testid={ `${i}-horizontal-image` }
          />
        </Link>
      </div>
      <div className="done-card-info">
        <span className="done-copyMsg invisible">Link copiado!</span>
        <button type="button" className="done-card-share-btn" onClick={ shareRecipe }>
          <img
            src={ shareIcon }
            alt="share-icon"
            data-testid={ `${i}-horizontal-share-btn` }
          />
        </button>
        <p data-testid={ `${i}-horizontal-top-text` } className="done-card-cat">
          {topText}
        </p>
        <Link to={ `/${page}/${r.id}` }>
          <p data-testid={ `${i}-horizontal-name` } className="done-card-tit">
            {r.name}
          </p>
        </Link>
        <p data-testid={ `${i}-horizontal-done-date` }>{`Feita em: ${r.doneDate}`}</p>
        {r.type === 'comida' && r.tags.map((t) => (
          <span
            key={ t }
            data-testid={ `${i}-${t}-horizontal-tag` }
            className="done-card-tag"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default DoneCard;

DoneCard.propTypes = {
  r: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ])).isRequired,
  i: PropTypes.number.isRequired,
};
