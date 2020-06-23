'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    nom_cat: DataTypes.STRING,
    libelle: DataTypes.STRING,
    flag: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Categorie.hasMany(models.Quiz);
        models.Categorie.hasMany(models.Type_pub);
      }
    }
  });
  return Categorie;
};