'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jeux = sequelize.define('Jeux', {
    quizId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    reponse: DataTypes.STRING,
    point: DataTypes.INTEGER,
    illustation: DataTypes.STRING
  }, {});
  Jeux.associate = function(models) {
    // associations can be defined here
  };
  return Jeux;
};