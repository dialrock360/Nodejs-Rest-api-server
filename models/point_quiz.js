'use strict';
module.exports = (sequelize, DataTypes) => {
  const Point_quiz = sequelize.define('Point_quiz', {
    userId: DataTypes.INTEGER,
    quizId: DataTypes.INTEGER,
    recor: DataTypes.DOUBLE,
    last_date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
        models.Point_quiz.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        
        models.Point_quiz.belongsTo(models.Quiz, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Point_quiz;
};