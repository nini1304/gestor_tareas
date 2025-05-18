const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no válido' });

    req.user = usuario; 
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};
