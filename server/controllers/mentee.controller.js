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

async function getById(req, res) {
  try {
    const { id } = req.params;
    const mentee = mentees.find(
      (mentee) => mentee._id === parseInt(req.params.id)
    );
    res.status(200);
    res.send(mentee);
  } catch {
    res.status(500);
    res.send('Could not get the list of mentees.');
  }
}

module.exports = { getAll, getById };
