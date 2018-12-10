import axios from '../utils/axios';
import storage from '../utils/storage';

export default async function logout() {
  await storage.setAccessToken('');
  axios.setToken(null);

  window.location = '/';
}
