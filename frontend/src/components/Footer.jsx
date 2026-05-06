const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>AdSphere</h3>
          <p>The premium marketplace for digital products.</p>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AdSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
