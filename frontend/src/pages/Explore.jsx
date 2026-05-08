import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdCard from '../components/AdCard';
import API_BASE_URL from '../config';

const Explore = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    // Extract category from URL if present
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);

    const fetchInitialData = async () => {
      try {
        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        const catData = await catRes.json();
        setCategories(catData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchInitialData();
  }, [location]);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE_URL}/api/ads?`;
        if (selectedCategory) url += `category=${encodeURIComponent(selectedCategory)}&`;
        if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}`;

        const res = await fetch(url);
        const data = await res.json();
        setAds(data);
      } catch (err) {
        console.error('Error fetching ads:', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchAds();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="explore-page">
      <header className="explore-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Explore Digital Systems</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Browse through our curated list of high-quality websites, mobile apps, and software systems.
        </p>
      </header>

      <div className="explore-controls" style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '3rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <input 
          type="text" 
          placeholder="Search systems..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            minWidth: '300px',
            fontSize: '1rem'
          }}
        />
        
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            fontSize: '1rem',
            background: 'var(--surface)'
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-spinner" style={{ textAlign: 'center', padding: '4rem' }}>
          Searching for the best systems...
        </div>
      ) : ads.length > 0 ? (
        <div className="ads-grid">
          {ads.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="no-results" style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
          <h3>No systems found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or category filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}
            className="btn-secondary"
            style={{ marginTop: '1.5rem' }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
