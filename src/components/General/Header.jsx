/* eslint-disable no-alert */
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

const searchMeals = async (radioType, query, dispatch, history) => {
  try {
    const { data } = await fetchMealsByQuery(radioType, query);
    if (!data.meals) {
      fetchMealsByQuery('s', '')
        .then((res) => dispatch({ type: 'SUCCESS', payload: res.data.meals }))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    }
    if (data.meals.length === 1) history.push(`/comidas/${data.meals[0].idMeal}`);
    dispatch({ type: 'SUCCESS', payload: data.meals });
  } catch (err) {
    dispatch({ type: 'ERROR', payload: err.message });
  }
};

const searchDrinks = async (radioType, query, dispatch, history) => {
  try {
    const { data } = await fetchDrinksByQuery(radioType, query);
    if (!data.drinks) {
      fetchDrinksByQuery('s', '')
        .then((res) => dispatch({ type: 'SUCCESS', payload: res.data.drinks }))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    }
    if (data.drinks.length === 1) history.push(`/bebidas/${data.drinks[0].idDrink}`);
    dispatch({ type: 'SUCCESS', payload: data.drinks });
  } catch (err) {
    dispatch({ type: 'ERROR', payload: err.message });
  }
};

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

  const fetchRecipes = () => {
    if (radioType === 'f' && query.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    toggleSearchBar();

    dispatch({ type: 'FETCHING' });
    if (title === 'Comidas' || title === 'Explorar Origem') {
      searchMeals(radioType, query, dispatch, history);
    } else {
      searchDrinks(radioType, query, dispatch, history);
    }

    setQuery('');
    setRadioType('');
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
