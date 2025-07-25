import PostList from '../components/PostList';
import { removeToken } from '../services/auth';


export default function Home({ onLogout }) {
  return (
    <div>
      <button onClick={() => { removeToken(); onLogout(); }}>
        Cerrar sesión
      </button>
      <PostList />
    </div>
    
  );
}
