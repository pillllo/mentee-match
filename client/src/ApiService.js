const BASE_URL = 'http://localhost:3001';

function fetchRequest(path, options) {
  return fetch(`${BASE_URL}${path}`, options)
    .then((res) => (res.status <= 400 ? res : Promise.reject()))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch((err) => console.error('Error:, err'));
}

function getMentees() {
  return fetchRequest('/');
}

function putMenteeChoice(id, mentee) {
  return fetchRequest(`/mentee/:${id}'`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mentee),
  });
}

// Input criteria (key-value pair) by which to filter
function getFilteredMentees(careerPath) {
  return fetchRequest(`/?careerPath=${careerPath}`);
}

const ApiService = {
  getMentees,
  putMenteeChoice,
  getFilteredMentees,
};

export default ApiService;
