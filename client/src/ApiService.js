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

// function putMenteeChoice(id, mentee, mentor) {
//   return fetchRequest(`/mentee/:${id}'`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(mentee, mentor),
//   });
// }

function putMenteeChoice(menteeId, mentorId) {
  console.log('🎯 ApiService', `/mentee/${menteeId}/${mentorId}`);
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

const ApiService = {
  getMentees,
  putMenteeChoice,
  loginMentor,
};

export default ApiService;
