import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDrinksByQuery, fetchMealsByQuery } from '../../services/API';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../CSS/Header.css';

const radioArray = ['Ingrediente', 'Nome', 'Primeira letra'];
const radioValues = ['i', 's', 'f'];
const testId = ['ingredient', 'name', 'first-letter'];

function Header({ title, search }) {
  const dispatch = useDispatch();
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [query, setQuery] = useState('');
  const [radioType, setRadioType] = useState('');
  const history = useHistory();

  const toggleSearchBar = () => {
    setSearchBarStatus((state) => !state);
    const categories = document.querySelector('.categories-container');
    if (categories) categories.classList.toggle('invisible');
  };

  const fetchRecipes = async () => {
    if (radioType === 'f' && query.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    toggleSearchBar();
    if (title === 'Comidas' || title === 'Explorar Origem') {
      const meals = await fetchMealsByQuery(radioType, query, dispatch);
      if (meals.length === 1) history.push(`/comidas/${meals[0].idMeal}`);
    } else {
      const drinks = await fetchDrinksByQuery(radioType, query, dispatch);
      if (drinks.length === 1) history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  };

  return (
    <header className="header">
      <div className="header-static-container">
        <Link to="/perfil" className="header-profile-btn">
          <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
        </Link>
        <h3 className="header-title" data-testid="page-title">{title}</h3>
        { search && (
          <button
            type="button"
            className="header-search-btn"
            onClick={ toggleSearchBar }
          >
            <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
          </button>
        ) }
      </div>

      { searchBarStatus && (
        <div key="searchBar" className="header-searchbar">
          <input
            type="text"
            className="searchbar-input"
            data-testid="search-input"
            value={ query }
            onChange={ (evt) => setQuery(evt.currentTarget.value) }
          />
          <div className="searchbar-radio-container">
            {radioArray.map((r, i) => (
              <label key={ r } htmlFor={ r } data-testid={ `${testId[i]}-search-radio` }>
                <input
                  type="radio"
                  id={ r }
                  name="searchbar-radio"
                  value={ radioValues[i] }
                  onChange={ (evt) => setRadioType(evt.currentTarget.value) }
                />
                {r}
              </label>
            ))}
          </div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ fetchRecipes }
          >
            Buscar
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: false,
};
