function getAccessToken() {
  return localStorage.getItem('token');
}

function setAccessToken(token) {
  return localStorage.setItem('token', token);
}

export default {
  getAccessToken,
  setAccessToken,
};
