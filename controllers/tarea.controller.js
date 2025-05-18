const { Tarea } = require('../models');
const { Op } = require('sequelize');

exports.crearTarea = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const tarea = await Tarea.create({ title, description, status, dueDate, userId: req.user.id });
    res.status(201).json({ message: 'Tarea creada exitosamente', task: tarea });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerTareas = async (req, res) => {
  const { status, search } = req.query;
  const filtros = { userId: req.user.id };

  if (status) filtros.status = status;
  if (search) {
    filtros[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } }
    ];
  }

  try {
    const tareas = await Tarea.findAll({ where: filtros });
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    await tarea.update(req.body);
    res.json({ message: 'Tarea actualizada correctamente', tarea });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });

    await tarea.destroy();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
