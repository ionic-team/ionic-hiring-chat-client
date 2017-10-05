import { apiFetch } from './api';

import { setState, persist } from './store';

const login = (username, password) => {
  return apiFetch('/api/v1/user/login', null, 'POST', {
    username,
    password
  });
}

const signup = (username, password) => {
  return apiFetch('/api/v1/user/signup', null, 'POST', {
    username,
    password
  });
}

const logout = (user) => {
  const r = apiFetch('/api/v1/user/logout', user && user.token, 'GET');

  setState({
    user: null
  })
  persist({
    user: null
  })
  return r;
}

export { login, signup, logout };