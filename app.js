require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // ✅ Agregado

// Importar modelos y base de datos
const db = require('./models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clienteRoutes = require('./routes/cliente.routes');
const pedidoRoutes = require('./routes/pedido.routes');
const authRoutes = require('./routes/auth.routes');
const tareaRoutes = require('./routes/tarea.routes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // ✅ Agregado
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', clienteRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', authRoutes);
app.use('/api', tareaRoutes);

// Sincronizar Sequelize con la base de datos
db.sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos sincronizada correctamente');
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });

module.exports = app;
