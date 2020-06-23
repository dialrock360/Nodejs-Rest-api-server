'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    id_categorie: DataTypes.INTEGER,
    nomquiz: DataTypes.STRING,
    nbr_question: DataTypes.INTEGER,
    note: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Quiz.hasMany(models.Point_quiz);
        models.Quiz.belongsTo(models.Categorie, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Quiz;
};