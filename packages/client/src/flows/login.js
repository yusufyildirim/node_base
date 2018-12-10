import axios from '../utils/axios';
import storage from '../utils/storage';

export default async function login(token) {
  await storage.setAccessToken(token);
  axios.setToken(token);

  window.location = '/home';
}
