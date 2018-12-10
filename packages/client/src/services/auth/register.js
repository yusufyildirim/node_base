import { axios } from 'utils';
import { constants } from 'resources';

export default async function register({ email, password, firstname, lastname }) {
  const params = { email, password, firstname, lastname };

  return axios.post(constants.API_AUTH_REGISTER, params);
}
