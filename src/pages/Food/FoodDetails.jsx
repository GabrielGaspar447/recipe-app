import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinksByQuery, fetchMealById } from '../../services/API';
import { DetailsImage, DetailsHeader, DetailsIngredients,
  DetailsInstructions, DetailsVideo,
  DetailsRecommendations, DetailsStartRecipe } from '../../components/Details';
import '../../CSS/Details.css';

function FoodDetails() {
  const [firstRender, setFirstRender] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });
    Promise.all([fetchMealById(id, dispatch), fetchDrinksByQuery('s', '', dispatch)])
      .then(([recipe, recoms]) => {
        const payload = { recipe: recipe.data.meals[0], recoms: recoms.data.drinks };
        dispatch({ type: 'SUCCESS', payload });
      })
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
  }, [id, dispatch]);

  if (firstRender) return null;
  if (fetching) return <h3>Buscando detalhes da receita ...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
  return (
    <>
      <DetailsImage spec="Meal" />
      <DetailsHeader spec="Meal" />
      <DetailsIngredients />
      <DetailsInstructions />
      <DetailsVideo />
      <DetailsRecommendations spec="Meal" />
      <DetailsStartRecipe spec="Meal" />
    </>
  );
}

export default FoodDetails;
