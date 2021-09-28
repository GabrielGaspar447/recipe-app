import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InProgressFinishRecipe, InProgressHeader, InProgressImage,
  InProgressIngredients, InProgressInstructions } from '../../components/InProgress';
import { fetchMealById } from '../../services/API';
import '../../CSS/InProgress.css';

function FoodInProgress() {
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });
    fetchMealById(id)
      .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.meals[0] }))
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
  }, [dispatch, id]);

  if (firstRender) return null;
  if (fetching) return <h3>Pré-aquecendo o forno...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
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
