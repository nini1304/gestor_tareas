const { Pedido } = require('../models');

exports.obtenerPedidos = async (req, res) => {
  const pedidos = await Pedido.findAll();
  res.json(pedidos);
};

exports.obtenerPedidoPorId = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  res.json(pedido);
};

exports.crearPedido = async (req, res) => {
  const pedido = await Pedido.create(req.body);
  res.status(201).json(pedido);
};

exports.actualizarPedido = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  if (pedido) {
    await pedido.update(req.body);
    res.json(pedido);
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }
};

exports.eliminarPedido = async (req, res) => {
  const pedido = await Pedido.findByPk(req.params.id);
  if (pedido) {
    await pedido.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }
};
