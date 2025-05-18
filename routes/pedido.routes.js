const express = require('express');
const router = express.Router();
const {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido
} = require('../controllers/pedido.controller');

router.get('/pedidos', obtenerPedidos);
router.get('/pedidos/:id', obtenerPedidoPorId);
router.post('/pedidos', crearPedido);
router.put('/pedidos/:id', actualizarPedido);
router.delete('/pedidos/:id', eliminarPedido);

module.exports = router;
