'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE
  });

  Tarea.associate = (models) => {
    Tarea.belongsTo(models.Usuario, { foreignKey: "userId" });
  };

  return Tarea;
};
