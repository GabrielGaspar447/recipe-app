import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DoneCardsList, DoneCategories } from '../../components/Done';
import { Header } from '../../components/General';
import '../../CSS/Done.css';

function DoneRecipes() {
  const doneRecipes = useSelector((state) => state.recipes.doneRecipes);
  const [filter, setFilter] = useState('All');
  const [recsToShow, setRecsToShow] = useState(doneRecipes);

  useEffect(() => {
    if (filter === 'All') {
      setRecsToShow(doneRecipes);
    } else {
      setRecsToShow(doneRecipes.filter((r) => r.type === filter));
    }
  }, [doneRecipes, filter]);

  return (
    <>
      <Header title="Receitas Feitas" />
      {doneRecipes.length < 1 ? (
        <p>Parece que você não completou nenhuma receita</p>
      ) : (
        <>
          <DoneCategories setFilter={ setFilter } />
          <DoneCardsList recsToShow={ recsToShow } />
        </>
      )}
    </>
  );
}

export default DoneRecipes;
