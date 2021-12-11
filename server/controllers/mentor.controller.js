const bcrypt = require('bcrypt');
const { Mentor } = require('../models/index');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await User.findOne({ email: email });
    const user = await Mentor.findOne({ where: { email: email } });
    // const validatedPass = await bcrypt.compare(password, user.password);
    // if (!validatedPass) throw new Error();
    if (!user) throw new Error();
    req.session.uid = user.id;
    res.status(200).send(user);
  } catch (error) {
    res.status(401).send('Username or password is incorrect');
  }
};

const profile = async (req, res) => {
  try {
    // TODO: set right data coming in from FE request
    // const { _id, firstName, lastName } = req.user;
    // const user = { _id, firstName, lastName };
    const { id, fullName, firstName } = req.user;
    const user = { id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send('User not found');
  }
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send('Could not log out, please try again');
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};

module.exports = { login, profile, logout };
