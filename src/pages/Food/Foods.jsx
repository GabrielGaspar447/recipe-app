import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { Categories, RecipesList } from '../../components/Home';
import { fetchMealByIngredient, fetchMealsByCategory, fetchMealsByQuery,
  fetchMealsCategories } from '../../services/API';
import '../../CSS/Home.css';

function Foods() {
  const [firstRender, setFirstRender] = useState(true);
  const { location } = useHistory();
  const dispatch = useDispatch();
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCat, setCat] = useState('All');

  useEffect(() => {
    if (!location.state) {
      fetchMealsCategories()
        .then(({ data }) => setCategoriesList(data.meals))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
    }
  }, [dispatch, location.state]);

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });

    if (!location.state) {
      if (selectedCat === 'All') {
        fetchMealsByQuery('s', '')
          .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.meals }))
          .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
      } else {
        fetchMealsByCategory(selectedCat)
          .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.meals }))
          .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
      }
    }

    if (location.state) {
      fetchMealByIngredient(location.state.ing)
        .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.meals }))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
    }
  }, [dispatch, location.state, selectedCat]);

  if (firstRender) return null;
  return (
    <>
      <Header title="Comidas" search />
      {!location.state && <Categories catList={ categoriesList } setCat={ setCat } />}
      <RecipesList spec="Meal" />
      <Footer />
    </>
  );
}

export default Foods;
