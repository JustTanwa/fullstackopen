import React, { useState } from 'react';
import loginService from '../services/login';
import Notification from './Notification';
import blogService from '../services/blogs';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);

      window.localStorage.setItem('blogLoggedInUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage(
        'Unable to log in, please check your username and/or password'
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <div>
      <Notification message={errorMessage} messageStyle='failed' />
      <h2>Log in to Bloglist</h2>
      <form onSubmit={handleLogin}>
        <div className='input-group'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
