const express = require('express');
const router = express.Router();
const TareaController = require('../controllers/tarea.controller');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/tasks', TareaController.crearTarea);
router.get('/tasks', TareaController.obtenerTareas);
router.get('/tasks/:id', TareaController.obtenerTareaPorId);
router.put('/tasks/:id', TareaController.actualizarTarea);
router.delete('/tasks/:id', TareaController.eliminarTarea);

module.exports = router;
