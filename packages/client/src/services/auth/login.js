import { axios } from 'utils';
import { constants } from 'resources';

export default async function login({ email, password }) {
  const params = { email, password };

  return axios.post(constants.API_AUTH_LOGIN, params);
}
