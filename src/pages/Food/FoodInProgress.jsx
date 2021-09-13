import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InProgressFinishRecipe, InProgressHeader, InProgressImage,
  InProgressIngredients, InProgressInstructions } from '../../components/InProgress';
import { fetchMealById } from '../../services/API';
import '../../CSS/InProgress.css';

function FoodInProgress() {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.api.recipe);
  const { id } = useParams();

  useEffect(() => {
    if (!recipe) {
      fetchMealById(id, dispatch);
    }
  }, [dispatch, recipe, id]);

  if (!recipe) return null;
  return (
    <>
      <InProgressImage spec="Meal" />
      <InProgressHeader spec="Meal" />
      <InProgressIngredients spec="Meal" />
      <InProgressInstructions />
      <InProgressFinishRecipe spec="Meal" />
    </>
  );
}

export default FoodInProgress;
