const mentees = require('../models/mockMentees');
const db = require('../models/index');

async function getAll(req, res) {
  try {
    const mentees = await db.Mentee.findAll();
    res.status(200).send(mentees);
  } catch {
    res.status(500).send('Could not get the list of mentees.');
  }
}

async function updateChoice(req, res) {
  try {
    const { _id, chosen, chosenByMe } = req.body;
    const index = mentees.findIndex((mentee) => mentee._id === _id);
    mentees[index].chosen = chosen;
    mentees[index].chosenByMe = chosenByMe;
    const updatedMentee = mentees[index];
    res.status(201).send(updatedMentee);
  } catch {
    res.status(500).send('Could not update mentee choice.');
  }
}

module.exports = { getAll, updateChoice };
