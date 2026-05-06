const AdCard = ({ ad }) => {
  return (
    <div className="ad-card">
      <div className="ad-image-container">
        <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
        <span className="ad-category-badge">{ad.category}</span>
      </div>
      <div className="ad-content">
        <h3 className="ad-title">{ad.title}</h3>
        <p className="ad-description">{ad.description.substring(0, 100)}...</p>
        <div className="ad-footer">
          <span className="ad-price">{ad.price > 0 ? `$${ad.price}` : 'Free'}</span>
          <a href={ad.link} target="_blank" rel="noopener noreferrer" className="btn-primary btn-small">View Details</a>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
