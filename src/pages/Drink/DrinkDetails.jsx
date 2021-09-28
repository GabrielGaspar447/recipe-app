import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkById, fetchMealsByQuery } from '../../services/API';
import { DetailsImage, DetailsHeader, DetailsIngredients, DetailsInstructions,
  DetailsRecommendations, DetailsStartRecipe } from '../../components/Details';
import '../../CSS/Details.css';

function DrinkDetails() {
  const [firstRender, setFirstRender] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });
    Promise.all([fetchDrinkById(id, dispatch), fetchMealsByQuery('s', '', dispatch)])
      .then(([recipe, recoms]) => {
        const payload = { recipe: recipe.data.drinks[0], recoms: recoms.data.meals };
        dispatch({ type: 'SUCCESS', payload });
      })
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
  }, [id, dispatch]);

  if (firstRender) return null;
  if (fetching) return <h3>Buscando detalhes da receitas ...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
  return (
    <>
      <DetailsImage spec="Drink" />
      <DetailsHeader spec="Drink" />
      <DetailsIngredients />
      <DetailsInstructions />
      <DetailsRecommendations spec="Drink" />
      <DetailsStartRecipe spec="Drink" />
    </>
  );
}

export default DrinkDetails;
