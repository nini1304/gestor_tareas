const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

exports.registrar = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: 'Email ya registrado' });

    const nuevoUsuario = await Usuario.create({ nombre, email, contraseña });
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: 'Credenciales inválidas' });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.json(usuario);
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};
