const mentors = require('../models/mockMentors');

async function login(req, res) {
  try {
    const { email } = req.body;
    const mentor = mentors.find((mentor) => mentor.email === email);
    if (!mentor) throw new Error();
    res.status(200).send(mentor);
  } catch {
    res.status(401).send('Username or password is incorrect');
  }
}

// async function logout(req, res) {
//   try {

//   } catch {}
// }

module.exports = { login };
