'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    flag: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.hasMany(models.Message);
        models.User.hasMany(models.Point_quiz);
        models.User.hasMany(models.Publication);
      }
    }
  });
  return User;
};