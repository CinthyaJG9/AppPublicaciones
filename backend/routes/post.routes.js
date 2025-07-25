const express = require('express');
const router = express.Router();
const { crearPublicacion, obtenerPublicaciones } = require('../controllers/post.controller');
const auth = require('../middleware/auth');

// Rutas protegidas
router.get('/', obtenerPublicaciones);  // pública
router.post('/', auth, crearPublicacion); // privada
router.get('/:id', auth, obtenerPublicaciones); // privada, para obtener una publicación específica

module.exports = router;
