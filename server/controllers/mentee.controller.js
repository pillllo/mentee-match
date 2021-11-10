const mentees = require('../models/mock');

async function getAll(req, res) {
  try {
    res.status(200);
    res.send(mentees);
  } catch {
    res.status(500);
    res.send('Could not get the list of mentees.');
  }
}

module.exports = { getAll };
