import { axios } from 'utils';
import { constants } from 'resources';

export default async function postExample() {
  const headers = {};
  const params = {};

  return axios.post(constants.POST_API_EXAMPLE, params, { headers });
}
