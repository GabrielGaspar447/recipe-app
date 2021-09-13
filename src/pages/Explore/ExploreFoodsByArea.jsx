import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaSelect, RecipesList } from '../../components/ExploreArea';
import { Footer, Header } from '../../components/General';
import { fetchMealAreas, fetchMealByArea, fetchMealsByQuery } from '../../services/API';
import '../../CSS/ExploreArea.css';

function ExploreFoodsByArea() {
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.api.explore);
  const [area, setArea] = useState('All');

  useEffect(() => {
    fetchMealAreas(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (area === 'All') {
      fetchMealsByQuery('s', '', dispatch);
    } else {
      fetchMealByArea(dispatch, area);
    }
  }, [dispatch, area]);

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
