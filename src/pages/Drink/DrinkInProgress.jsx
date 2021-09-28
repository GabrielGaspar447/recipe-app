import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InProgressFinishRecipe, InProgressHeader, InProgressImage,
  InProgressIngredients, InProgressInstructions } from '../../components/InProgress';
import { fetchDrinkById } from '../../services/API';
import '../../CSS/InProgress.css';

function DrinkInProgress() {
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });
    fetchDrinkById(id)
      .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.drinks[0] }))
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
  }, [dispatch, id]);

  if (firstRender) return null;
  if (fetching) return <h3>Buscando o gelo...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
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
