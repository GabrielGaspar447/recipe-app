import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { fetchRandomDrink } from '../../services/API';

function ExploreDrinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [surprise, setSurprise] = useState(false);

  const surpriseDrink = async () => {
    setSurprise(true);
    try {
      const { data } = await fetchRandomDrink(dispatch);
      history.push(`/bebidas/${data.drinks[0].idDrink}`);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Tivemos algum problema ao buscar a receita,'
      + ' por favor tente novamente mais tarde.');
      setSurprise(false);
    }
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
