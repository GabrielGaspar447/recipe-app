import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { fetchDrinkIngredients } from '../../services/API';
import '../../CSS/ExploreIng.css';

function ExploreFoodsByIng() {
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.api.data);
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
    setFirstRender(false);
    dispatch({ type: 'FETCHING' });
    fetchDrinkIngredients()
      .then(({ data }) => dispatch({ type: 'SUCCESS', payload: data.drinks }))
      .catch((err) => dispatch({ type: 'ERROR', payload: err.message }));
  }, [dispatch]);

  if (firstRender) return null;
  if (fetching) return <h2>Buscando ingredientes...</h2>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="explore-ing-list">
        {ingredients.map(({ strIngredient1: ing }, idx) => (
          <Link key={ ing } to={ { pathname: '/bebidas', state: { ing } } }>
            <div className="explore-ing-card" data-testid={ `${idx}-ingredient-card` }>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ing}-Small.png` }
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
