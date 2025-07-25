import { useEffect, useState } from 'react';
import { getPosts, createPost } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [contenido, setContenido] = useState('');

  useEffect(() => {
    fetchPosts();
    socket.on('nueva-publicacion', (post) => {
      setPosts((prev) => [post, ...prev]);
    });
    return () => socket.off('nueva-publicacion');
  }, []);

  const fetchPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Inicia sesión');
    await createPost({ contenido }, token);
    setContenido('');
  };

  return (
    <div>
      <div className="my-4">
        <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} placeholder="¿Qué estás pensando?" />
        <button onClick={handlePost}>Publicar</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border my-2 p-2">
            <strong>{post.nombre}</strong> <br />
            {post.contenido}
          </li>
        ))}
      </ul>
    </div>
  );
}
