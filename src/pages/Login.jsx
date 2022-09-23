import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const minLength = 6;
    const disabled = regex.test(login.email) && login.password.length > minLength;
    setIsDisabled(!disabled);
  }, [login]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          name="email"
          value={ login.email }
          data-testid="email-input"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          type="password"
          name="password"
          value={ login.password }
          data-testid="password-input"
          placeholder="Password"
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </section>
  );
}

export default Login;
