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
Mentor.hasMany(Mentee);
Mentee.belongsTo(Mentor, {
  foreignKey: 'MentorId',
});

// TODO: implement many to many relationship for bookmarking
// Relationship 2: two2many -> 1 Mentor can choose many Mentees, 1 Mentee can only be chosen by 1 Mentor
// Mentor.belongsToMany(Mentee, { through: 'MentorsMentees' });
// Mentee.belongsToMany(Mentor, { through: 'MentorsMentees' });

// Set up db with all models
const db = {};
db.Mentee = Mentee;
db.Mentor = Mentor;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// function for testing db connection
// async function test() {
//   const mentor1 = await Mentor.findOne({
//     where: { firstName: 'Agnieszka' },
//   });
//   const mentee1 = await Mentee.findOne({
//     where: { id: 1000 },
//   });
//   const mentor1mentees = await mentor1.getMentees();
//   const mentee1mentors = await mentee1.getMentor();

//   console.log('Mentor1:', mentor1.dataValues.fullName);
//   console.log('Mentor 1 # of mentees:', mentor1mentees.length);
//   console.log('Mentee1:', mentee1.dataValues.name);
//   console.log('Mentor of mentee 1:', mentee1mentors.dataValues.fullName);
// }
// test();
