import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;
const http = axios.create({ baseURL: `${baseURL}/` });

function getAuthHeader() {
  const accessToken = localStorage.getItem('hemergy-token');
  let authHeader = { 'Content-Type': 'application/json' };
  if (accessToken) {
    authHeader = { 'x-auth-token': accessToken };
  }
  return authHeader;
}

function get(url, headers = {}, params = {}, signal = null) {
  return http.get(url, {
    params,
    signal,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, {
    ...params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function put(url, data, headers = {}) {
  return http.put(url, data, { headers: { ...getAuthHeader(), ...headers } });
}

function remove(url, data, headers = {}) {
  return http.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data,
  });
}

export default {
  http,
  get,
  post,
  put,
  remove,
};