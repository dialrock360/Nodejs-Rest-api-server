'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    userId: DataTypes.INTEGER,
    id_type_pub: DataTypes.INTEGER,
    objet: DataTypes.STRING,
    date_publication: DataTypes.DATE,
    nbr_traduction: DataTypes.INTEGER,
    flag: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
        models.Publication.hasMany(models.Contenu);
        models.Publication.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Publication;
};