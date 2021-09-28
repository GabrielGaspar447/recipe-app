import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer, Header } from '../../components/General';
import '../../CSS/Profile.css';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);

  const logout = () => {
    dispatch({ type: 'CLEAR_API_DB' });
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Perfil" />
      <div className="profile-container">
        <h2 data-testid="profile-email">{email}</h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Sair
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
