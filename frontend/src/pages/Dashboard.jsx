import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';
import './Dashboard.css';

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
        const res = await fetch(`${API_BASE_URL}/api/ads`);
        const data = await res.json();
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
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Manage your digital product promotions</p>
        </div>
        <Link to="/submit" className="btn-primary">Create New Ad</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Active Ads</h4>
          <div className="stat-value">{ads.length}</div>
        </div>
        <div className="stat-card">
          <h4>Total Views</h4>
          <div className="stat-value">1,245</div>
        </div>
        <div className="stat-card">
          <h4>Total Clicks</h4>
          <div className="stat-value">384</div>
        </div>
      </div>

      <h3 className="submissions-title">Your Submissions</h3>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : ads.length > 0 ? (
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map(ad => (
                <tr key={ad.id}>
                  <td style={{ fontWeight: '500' }}>{ad.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{ad.category}</td>
                  <td>
                    <span className={`status-badge ${ad.status === 'pending' ? 'status-pending' : 'status-active'}`}>
                      {ad.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-dashboard">
          <p>You haven't submitted any ads yet.</p>
          <Link to="/submit" className="btn-primary">Create Your First Ad</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
