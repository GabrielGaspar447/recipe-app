import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import { fetchRandomMeal } from '../../services/API';

function ExploreFoods() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [surprise, setSurprise] = useState(false);

  const surpriseMeal = async () => {
    setSurprise(true);
    try {
      const { data } = await fetchRandomMeal(dispatch);
      history.push(`/comidas/${data.meals[0].idMeal}`);
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
      <Header title="Explorar Comidas" />
      <div className="explore-btns-container">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ surpriseMeal }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
