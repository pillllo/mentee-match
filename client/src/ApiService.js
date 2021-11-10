const BASE_URL = 'http://localhost:3001';

function fetchRequest(path, options) {
  return fetch(`${BASE_URL}${path}`, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => console.error('Error:, err'));
}

function getMentees() {
  return fetchRequest('/home');
}

const ApiService = {
  getMentees,
};

export default ApiService;
