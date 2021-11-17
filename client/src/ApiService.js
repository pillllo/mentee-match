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

function putMenteeChoice(menteeId, mentorId) {
  return fetchRequest(`/mentee/${menteeId}/${mentorId}`, {
    method: 'PUT',
  });
}

function loginMentor(mentor) {
  return fetchRequest(`/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mentor),
  });
}

function profileMentor() {
  return fetchRequest(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
}

function logoutMentor() {
  return fetchRequest(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
}

const ApiService = {
  getMentees,
  putMenteeChoice,
  loginMentor,
  profileMentor,
  logoutMentor,
};

export default ApiService;
