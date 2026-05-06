import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo">AdSphere</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="user-greeting">Hi, {user?.name}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
