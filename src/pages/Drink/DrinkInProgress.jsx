import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InProgressFinishRecipe, InProgressHeader, InProgressImage,
  InProgressIngredients, InProgressInstructions } from '../../components/InProgress';
import { fetchDrinkById } from '../../services/API';

function DrinkInProgress() {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.api.recipe);
  const { id } = useParams();

  useEffect(() => {
    if (!recipe) {
      fetchDrinkById(id, dispatch);
    }
  }, [dispatch, recipe, id]);

  if (!recipe) return null;
  return (
    <>
      <InProgressImage spec="Drink" />
      <InProgressHeader spec="Drink" />
      <InProgressIngredients spec="Drink" />
      <InProgressInstructions />
      <InProgressFinishRecipe spec="Drink" />
    </>
  );
}

export default DrinkInProgress;
