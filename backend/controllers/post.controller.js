const pool = require('../models/db');

exports.crearPublicacion = async (req, res) => {
  const { contenido } = req.body;
  const usuarioId = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO publicaciones (contenido, usuario_id) VALUES ($1, $2) RETURNING *',
      [contenido, usuarioId]
    );

    // Emitir en tiempo real
    const io = req.app.get('io');
    io.emit('nueva-publicacion', result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPublicaciones = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, u.nombre FROM publicaciones p JOIN usuarios u ON p.usuario_id = u.id ORDER BY fecha_creacion DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
