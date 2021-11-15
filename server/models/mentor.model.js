module.exports = (sequelize, DataTypes) => {
  const Mentor = sequelize.define('Mentor', {
    fullName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Mentor;
};
