import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{ 
      textAlign: 'center', 
      padding: '10rem 2rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>System Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        The page you are looking for doesn't exist or has been moved to another digital dimension.
      </p>
      <Link to="/" className="btn-primary btn-large">
        Back to Headquarters
      </Link>
    </div>
  );
};

export default NotFound;
