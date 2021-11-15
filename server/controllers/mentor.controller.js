const mentors = require('../models/mockMentors');
const db = require('../models/index');

async function getAll(req, res) {
  try {
    const mentors = await db.Mentor.findAll();
    res.status(200).send(mentors);
  } catch {
    res.status(500).send('Could not get the list of mentors.');
  }
}

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

module.exports = { getAll, login };
