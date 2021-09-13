import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinksByQuery, fetchMealById } from '../../services/API';
import { DetailsImage, DetailsHeader, DetailsIngredients,
  DetailsInstructions, DetailsVideo,
  DetailsRecommendations, DetailsStartRecipe } from '../../components/Details';
import '../../CSS/Details.css';

function FoodDetails() {
  const { location } = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    if (!location.state) {
      fetchMealById(id, dispatch);
      fetchDrinksByQuery('s', '', dispatch);
    }
  }, [id, dispatch, location.state]);

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
