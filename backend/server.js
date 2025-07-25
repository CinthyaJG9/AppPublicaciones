const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Evento de Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado');
});

// Compartir io con las rutas
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
