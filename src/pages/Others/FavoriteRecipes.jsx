import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components/General';
import { FavoriteCategories, FavoriteCardsList } from '../../components/Favorite';
import '../../CSS/Favorite.css';

function FavoriteRecipes() {
  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);
  const [filter, setFilter] = useState('All');
  const [recsToShow, setRecsToShow] = useState(favoriteRecipes);

  useEffect(() => {
    if (filter === 'All') {
      setRecsToShow(favoriteRecipes);
    } else {
      setRecsToShow(favoriteRecipes.filter((r) => r.type === filter));
    }
  }, [favoriteRecipes, filter]);

  return (
    <>
      <Header title="Receitas Favoritas" />
      {favoriteRecipes.length < 1 ? (
        <p>Parece que você não tem nenhuma receita nos seus favoritos</p>
      ) : (
        <>
          <FavoriteCategories setFilter={ setFilter } />
          <FavoriteCardsList recsToShow={ recsToShow } />
        </>
      )}
    </>
  );
}

export default FavoriteRecipes;
