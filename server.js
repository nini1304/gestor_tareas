require('dotenv').config(); 
const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const PORT = process.env.DB_PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
