import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdCard from '../components/AdCard';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch mock data
    const fetchData = async () => {
      try {
        const [adsRes, catRes] = await Promise.all([
          fetch('http://localhost:5000/api/ads'),
          fetch('http://localhost:5000/api/categories')
        ]);
        
        const adsData = await adsRes.json();
        const catData = await catRes.json();
        
        setAds(adsData.slice(0, 6)); // Show top 6
        setCategories(catData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback mock data if backend isn't running
        setCategories(['Websites', 'Mobile Apps', 'Desktop Software']);
        setAds([
          { id: '1', title: 'TaskMaster Pro', description: 'Advanced task management for remote teams.', category: 'Websites', price: 29, imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80', link: '#' },
          { id: '2', title: 'FitSync App', description: 'Fitness tracking mobile app UI kit and backend.', category: 'Mobile Apps', price: 99, imageUrl: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=400&q=80', link: '#' },
          { id: '3', title: 'DataViz Desktop', description: 'Powerful desktop tool for visualizing complex datasets.', category: 'Desktop Software', price: 149, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80', link: '#' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Discover & Promote Digital Systems</h1>
        <p>The ultimate marketplace for developers and businesses to showcase websites, mobile apps, and software.</p>
        <div className="hero-actions">
          <Link to="/submit" className="btn-primary btn-large">Promote Your Product</Link>
          <Link to="/explore" className="btn-secondary btn-large">Browse Systems</Link>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <Link to={`/explore?category=${cat}`} key={idx} className="category-card">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Systems</h2>
          <Link to="/explore" className="btn-secondary">View All</Link>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading amazing systems...</div>
        ) : (
          <div className="ads-grid">
            {ads.map(ad => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
