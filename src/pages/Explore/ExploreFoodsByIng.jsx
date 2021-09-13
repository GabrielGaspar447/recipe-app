import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { fetchMealIngredients } from '../../services/API';
import '../../CSS/ExploreIng.css';

const twelve = 12;

function ExploreFoodsByIng() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.api.explore);

  useEffect(() => {
    fetchMealIngredients(dispatch);
  }, [dispatch]);

  if (!ingredients) return <h2>Buscando ingredientes...</h2>;
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="explore-ing-list">
        {ingredients.slice(0, twelve).map(({ strIngredient: ing }, idx) => (
          <Link key={ ing } to={ { pathname: '/comidas', state: { ing } } }>
            <div className="explore-ing-card" data-testid={ `${idx}-ingredient-card` }>
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ing}-Small.png` }
                alt={ ing }
                data-testid={ `${idx}-card-img` }
              />
              <p data-testid={ `${idx}-card-name` }>{ing}</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsByIng;
