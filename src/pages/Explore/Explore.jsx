import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import '../../CSS/Explore.css';

function Explore() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch({ type: 'CLEAR_API_DB' });
  }, [dispatch]);
  
  return (
    <>
      <Header title="Explorar" />
      <div className="explore-btns-container">
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
