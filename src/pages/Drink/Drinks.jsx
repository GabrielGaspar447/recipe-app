import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { Categories, RecipesList } from '../../components/Home';
import { fetchDrinkByIngredient, fetchDrinksByCategory, fetchDrinksByQuery,
  fetchDrinksCategories } from '../../services/API';
import '../../CSS/Home.css';

function Drinks() {
  const [firstRender, setFirstRender] = useState(true);
  const { location } = useHistory();
  const dispatch = useDispatch();
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCat, setCat] = useState('All');

  useEffect(() => {
    if (!location.state) {
      fetchDrinksCategories()
        .then(({ data }) => setCategoriesList(data.drinks))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
    }
  }, [dispatch, location.state]);

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });

    if (!location.state) {
      if (selectedCat === 'All') {
        fetchDrinksByQuery('s', '')
          .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.drinks }))
          .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
      } else {
        fetchDrinksByCategory(selectedCat)
          .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.drinks }))
          .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
      }
    }

    if (location.state) {
      fetchDrinkByIngredient(location.state.ing)
        .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.drinks }))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
    }
  }, [dispatch, location.state, selectedCat]);

  if (firstRender) return null;
  return (
    <>
      <Header title="Bebidas" search />
      {!location.state && <Categories catList={ categoriesList } setCat={ setCat } />}
      <RecipesList spec="Drink" />
      <Footer />
    </>
  );
}

export default Drinks;
