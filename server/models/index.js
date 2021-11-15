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

const db = {};

const menteeModel = createMenteeModel(sequelize, DataTypes);
// const mentorModel = createMentorModel(sequelize, DataTypes);

db.Mentee = menteeModel;
console.log('🎯 MenteeModel works', menteeModel);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
