import React, { useState } from 'react';
// TODO: remove
import auth from '../utils/auth';
import apiService from './../ApiService';

const initialState = {
  email: '',
  password: '',
};

const Login = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send a request to API service /login
    const { email, password } = state;
    const user = { email, password };
    const res = await apiService.login(user);
    if (res.error) {
      alert(res);
      setState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      // TODO: try remove props.
      props.setIsAuthenticated(true);
      // TODO: set the right path for someone who is logged in
      auth.login(() => props.history.push('/'));
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Login;
