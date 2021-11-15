const { Sequelize, DataTypes } = require('sequelize');
const createMenteeModel = require('./mentee.model');
const createMentorModel = require('./mentor.model');

const config = {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
};

// TODO: implement .env file
const sequelize = new Sequelize(
  'mentee-match',
  'nataliepilling',
  'dareit',
  config
);

// Create Mentor and Mentee models
const Mentee = createMenteeModel(sequelize, DataTypes);
const Mentor = createMentorModel(sequelize, DataTypes);

// Determine relationships between Mentors and Mentees
// Relationship 1: one2many -> 1 Mentor can choose many Mentees, 1 Mentee can only be chosen by 1 Mentor
Mentor.hasMany(Mentee, {
  foreignKey: 'myMentorId',
});
Mentee.belongsTo(Mentor);

// Relationship 2: two2many -> 1 Mentor can choose many Mentees, 1 Mentee can only be chosen by 1 Mentor
Mentor.belongsToMany(Mentee, { through: 'MentorsMentees' });
Mentee.belongsToMany(Mentor, { through: 'MentorsMentees' });

// Set up db with all models
const db = {};

db.Mentee = Mentee;
db.Mentor = Mentor;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
