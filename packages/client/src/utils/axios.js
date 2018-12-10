import axios from 'axios';
import { constants } from 'resources';
import serviceErrorHandler from './serviceErrorHandler';

const instance = axios.create({
  timeout: constants.serviceTimeout,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

/* ********** FUNCTIONS  ********** */
instance.setToken = (accessToken) => {
  instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
};


/* ********** REQUEST INTERCEPTOR  ********** */
function onRequest(config) {

  return config;
}

function onRequestFailed(error) {

  return Promise.reject(error);
}

/* ********** RESPONSE INTERCEPTOR  ********** */
function onResponse(response) {

  return response;
}

function onResponseFailed(error) {

  return Promise.reject(error);
}

instance.interceptors.request.use(onRequest, onRequestFailed);
instance.interceptors.response.use(onResponse, serviceErrorHandler);


export default instance;
