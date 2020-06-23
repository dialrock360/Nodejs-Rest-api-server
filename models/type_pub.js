'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type_pub = sequelize.define('Type_pub', {
    id_Categorie: DataTypes.INTEGER,
    designation: DataTypes.STRING,
    description: DataTypes.STRING,
    flag: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Type_pub.hasMany(models.Publication);
        models.Type_pub.belongsTo(models.Categorie, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Type_pub;
};