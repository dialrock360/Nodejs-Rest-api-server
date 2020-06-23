'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contenu = sequelize.define('Contenu', {
    id_publication: DataTypes.INTEGER,
    title: DataTypes.STRING,
    langue: DataTypes.STRING,
    contain: DataTypes.STRING,
    audio: DataTypes.STRING,
    video: DataTypes.STRING,
    flag: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
        models.Contenu.belongsTo(models.Publication, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Contenu;
};