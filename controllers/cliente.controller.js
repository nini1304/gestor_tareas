const { Cliente } = require('../models');

exports.obtenerClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
};

exports.obtenerClientePorId = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  res.json(cliente);
};

exports.crearCliente = async (req, res) => {
  const cliente = await Cliente.create(req.body);
  res.status(201).json(cliente);
};

exports.actualizarCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.update(req.body);
    res.json(cliente);
  } else {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
};

exports.eliminarCliente = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ mensaje: 'Cliente no encontrado' });
  }
};
