import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { Categories, RecipesList } from '../../components/Home';
import { fetchDrinkByIngredient } from '../../services/API';
import '../../CSS/Home.css';

function Drinks() {
  const { location } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      fetchDrinkByIngredient(dispatch, location.state.ing);
    }
  }, [dispatch, location.state]);

  return (
    <>
      <Header title="Bebidas" search />
      {!location.state && <Categories spec="Drink" />}
      <RecipesList spec="Drink" />
      <Footer />
    </>
  );
}

export default Drinks;
