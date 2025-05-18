'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    toJSON() {
      // Ocultar la contraseña al devolver datos del usuario
      const attributes = { ...this.get() };
      delete attributes.contraseña;
      return attributes;
    }
  }

  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    hooks: {
      beforeCreate: async (usuario) => {
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
      },
    },
  });
Usuario.associate = (models) => {
  Usuario.hasMany(models.Tarea, { foreignKey: "userId" });
};


  return Usuario;
};
