import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyAds = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ads');
        const data = await res.json();
        // In a real app, the backend would filter by user ID.
        // For mock purposes, we just show all pending or just simulate user's ads
        setAds(data); 
      } catch (err) {
        console.error('Error fetching ads', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-page" style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome, {user.name}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your digital product promotions</p>
        </div>
        <Link to="/submit" className="btn-primary">Create New Ad</Link>
      </div>

      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="stat-card" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Active Ads</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{ads.length}</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Views</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>1,245</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Clicks</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>384</div>
        </div>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Submissions</h3>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : ads.length > 0 ? (
        <div className="table-container" style={{ overflowX: 'auto', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Product</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Category</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map(ad => (
                <tr key={ad.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{ad.title}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{ad.category}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem',
                      background: ad.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: ad.status === 'pending' ? '#f59e0b' : '#10b981'
                    }}>
                      {ad.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You haven't submitted any ads yet.</p>
          <Link to="/submit" className="btn-primary">Create Your First Ad</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
