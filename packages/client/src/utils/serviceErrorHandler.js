import axios from './axios';

function handle401(error) {
  const { message } = error.response.data;

  return Promise.reject(error);
}
/* *************** */

async function handleServiceErrorByCode(error) {
  const { code, config } = error;

  switch (code) {
    case 'ECONNABORTED':
      // Connection Timeout
      break;

    default:
      break;
  }

  return Promise.reject(error);
}

function handleServiceErrorByStatusCode(error) {
  const { response } = error;
  switch (response.status) {
    case 401:
      // Token not provided or expired
      return handle401(error);

    default:
      break;
  }

  return Promise.reject(error);
}

// Main Handler
export default function serviceError(error) {
  const { code, response } = error;

  if (code) {
    // If network or device based error occurs
    return handleServiceErrorByCode(error);
  } else if (response) {
    // If server responds
    return handleServiceErrorByStatusCode(error);
  }

  // Just in case...
  return Promise.reject(error);
}
