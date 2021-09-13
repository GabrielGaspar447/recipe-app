import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../CSS/Login.css';

const emailRegex = /\S+@\S+\.\S+/;
const passwordMinLength = 7;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const btnStatus = !(emailRegex.test(email) && password.length >= passwordMinLength);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();
    const payload = { email, mealsToken: 1, cocktailsToken: 1 };
    dispatch({ type: 'REGISTER_USER', payload });
    history.push('/comidas');
  }, [dispatch, email, history]);

  return (
    <div className="login-container">
      <form onSubmit={ handleSubmit } className="login-form">
        <h3 className="login-heading">Login</h3>
        <input
          data-testid="email-input"
          className="login-email"
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ (evt) => setEmail(evt.currentTarget.value) }
        />
        <input
          data-testid="password-input"
          className="login-password"
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ (evt) => setPassword(evt.currentTarget.value) }
        />
        <button
          data-testid="login-submit-btn"
          className="login-btn"
          type="submit"
          disabled={ btnStatus }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
