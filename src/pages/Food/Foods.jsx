import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { Categories, RecipesList } from '../../components/Home';
import { fetchMealByIngredient } from '../../services/API';
import '../../CSS/Home.css';

function Foods() {
  const { location } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      fetchMealByIngredient(dispatch, location.state.ing);
    }
  }, [dispatch, location.state]);

  return (
    <>
      <Header title="Comidas" search />
      {!location.state && <Categories spec="Meal" />}
      <RecipesList spec="Meal" />
      <Footer />
    </>
  );
}

export default Foods;
