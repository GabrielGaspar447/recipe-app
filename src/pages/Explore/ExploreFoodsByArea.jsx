import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaSelect, RecipesList } from '../../components/ExploreArea';
import { Footer, Header } from '../../components/General';
import { fetchMealAreas, fetchMealByArea, fetchMealsByQuery } from '../../services/API';
import '../../CSS/ExploreArea.css';

function ExploreFoodsByArea() {
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.api.error);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState('All');

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    fetchMealAreas()
      .then(({ data }) => setAreas(data.meals))
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    if (area === 'All') {
      fetchMealsByQuery('s', '')
        .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.meals }))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
    } else {
      fetchMealByArea(area)
        .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.meals }))
        .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
    }
  }, [dispatch, area]);

  if (firstRender) return null;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
  return (
    <>
      <Header title="Explorar Origem" search />
      <AreaSelect areas={ areas } setArea={ setArea } />
      <RecipesList />
      <Footer />
    </>
  );
}

export default ExploreFoodsByArea;
