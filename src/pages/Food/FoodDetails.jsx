import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinksByQuery, fetchMealById } from '../../services/API';
import { DetailsImage, DetailsHeader, DetailsIngredients,
  DetailsInstructions, DetailsVideo,
  DetailsRecommendations, DetailsStartRecipe } from '../../components/Details';
import '../../CSS/Details.css';

function FoodDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    fetchMealById(id, dispatch);
    fetchDrinksByQuery('s', '', dispatch);
  }, [id, dispatch]);

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
