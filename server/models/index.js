const { Sequelize, DataTypes } = require('sequelize');
const createMenteeModel = require('./mentee.model');
const createMentorModel = require('./mentor.model');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  config
);

// Create Mentor and Mentee models
const Mentee = createMenteeModel(sequelize, DataTypes);
const Mentor = createMentorModel(sequelize, DataTypes);

// Determine relationships between Mentors and Mentees
// Relationship 1: one2many -> 1 Mentor can choose many Mentees, 1 Mentee can only be chosen by 1 Mentor
Mentor.hasMany(Mentee);
Mentee.belongsTo(Mentor, {
  foreignKey: 'MentorId',
});

// Set up db with all models
const db = {};
db.Mentee = Mentee;
db.Mentor = Mentor;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
