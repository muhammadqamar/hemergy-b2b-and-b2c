import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;
const baseURlCore = 'https://dev-core.hemergy.com';
const http = axios.create({ baseURL: `${baseURL}/` });
const httpCore = axios.create({ baseURL: `${baseURlCore}/` });

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
function getCore(url, headers = {}, params = {}, signal = null) {
  return httpCore.get(url, {
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
function postCore(url, data, headers = {}, params = {}) {
  return httpCore.post(url, data, {
    ...params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function put(url, data, headers = {}) {
  return http.put(url, data, { headers: { ...getAuthHeader(), ...headers } });
}
function putCore(url, data, headers = {}) {
  return httpCore.put(url, data, {
    headers: { ...getAuthHeader(), ...headers },
  });
}

function remove(url, data, headers = {}) {
  return http.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data,
  });
}
function removeCore(url, data, headers = {}) {
  return httpCore.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data,
  });
}
export default {
  http,
  httpCore,
  get,
  post,
  put,
  remove,
  getCore,
  removeCore,
  putCore,
  postCore,
};
