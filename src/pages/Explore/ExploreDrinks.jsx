import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { fetchMealsByQuery, fetchRandomDrink } from '../../services/API';

function ExploreDrinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [surprise, setSurprise] = useState(false);

  const surpriseDrink = async () => {
    setSurprise(true);
    fetchMealsByQuery('s', '', dispatch);
    const id = await fetchRandomDrink(dispatch);
    history.push(`/bebidas/${id}`, { from: 'surprise' });
  };

  if (surprise) return <h3>Escolhendo uma receita para você...</h3>;
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div className="explore-btns-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ surpriseDrink }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
