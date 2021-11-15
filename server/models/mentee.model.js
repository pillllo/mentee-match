module.exports = (sequelize, DataTypes) => {
  const Mentee = sequelize.define('Mentee', {
    name: DataTypes.STRING,
    careerPath: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    town: DataTypes.STRING,
    whyJoin: DataTypes.STRING(15000),
    goals: DataTypes.STRING(15000),
    supportNeeded: DataTypes.STRING(15000),
    prepDone: DataTypes.STRING(15000),
    timeSpent: DataTypes.STRING,
    determination: DataTypes.INTEGER,
    portfolio: DataTypes.STRING(15000),
    video: DataTypes.STRING,
    employmentSituation: DataTypes.STRING,
    profession: DataTypes.STRING,
    ageRange: DataTypes.STRING,
    mom: DataTypes.BOOLEAN,
    other: DataTypes.STRING(15000),
    feTech: DataTypes.STRING,
    beTech: DataTypes.STRING,
    beTechOther: DataTypes.STRING,
    MentorId: DataTypes.BIGINT,
  });
  return Mentee;
};
