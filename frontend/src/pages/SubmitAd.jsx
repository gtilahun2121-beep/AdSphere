import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const SubmitAd = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Websites',
    link: '',
    imageUrl: '',
    plan: 'free'
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.title || !formData.description || !formData.link)) {
      alert("Please fill all required fields");
      return;
    }
    setStep(step + 1);
  };

  const submitToBackend = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: formData.plan === 'premium' ? 29 : 0
        })
      });
      if (res.ok) {
        navigate('/dashboard');
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    // Mock payment API call
    try {
      const res = await fetch(`${API_BASE_URL}/api/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 29, method: 'card' })
      });
      const data = await res.json();
      if (data.success) {
        setPaymentSuccess(true);
        submitToBackend();
      }
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.plan === 'premium') {
      handlePayment();
    } else {
      submitToBackend();
    }
  };

  return (
    <div className="submit-page">
      <div className="submit-header">
        <h2>Promote Your Digital System</h2>
        <p>Reach thousands of potential users and buyers.</p>
      </div>

      <div className="submit-container">
        <div className="progress-bar">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Details</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Plan</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Publish</div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <h3>Product Details</h3>
            <div className="form-group">
              <label>System Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. My Awesome SaaS" required />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Describe your product..." required className="form-textarea"></textarea>
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="Websites">Websites</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Desktop Software">Desktop Software</option>
                <option value="SaaS">SaaS</option>
                <option value="Plugins">Plugins</option>
              </select>
            </div>
            <div className="form-group">
              <label>Product Link URL *</label>
              <input type="url" name="link" value={formData.link} onChange={handleInputChange} placeholder="https://..." required />
            </div>
            <div className="form-group">
              <label>Image URL (Optional)</label>
              <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." />
            </div>
            <button onClick={handleNext} className="btn-primary btn-large" style={{marginTop: '1rem'}}>Next Step</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3>Choose a Promotion Plan</h3>
            <div className="plans-container">
              <div className={`plan-card ${formData.plan === 'free' ? 'selected' : ''}`} onClick={() => setFormData({...formData, plan: 'free'})}>
                <h4>Basic Listing</h4>
                <div className="price">Free</div>
                <ul>
                  <li>Standard visibility</li>
                  <li>Listed in category</li>
                  <li>Basic analytics</li>
                </ul>
              </div>
              <div className={`plan-card premium ${formData.plan === 'premium' ? 'selected' : ''}`} onClick={() => setFormData({...formData, plan: 'premium'})}>
                <div className="badge">Recommended</div>
                <h4>Premium Promotion</h4>
                <div className="price">$29</div>
                <ul>
                  <li>Homepage featured slot</li>
                  <li>Top of category results</li>
                  <li>Advanced click analytics</li>
                  <li>Highlighted border</li>
                </ul>
              </div>
            </div>
            <div className="step-actions">
              <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h3>Review & Publish</h3>
            <div className="review-card">
              <h4>{formData.title}</h4>
              <p>Category: {formData.category}</p>
              <p>Plan: {formData.plan === 'premium' ? 'Premium ($29)' : 'Free'}</p>
            </div>
            
            <div className="step-actions">
              <button onClick={() => setStep(2)} className="btn-secondary" disabled={loading}>Back</button>
              <button onClick={handleSubmit} className="btn-primary btn-large" disabled={loading}>
                {loading ? 'Processing...' : (formData.plan === 'premium' ? 'Pay $29 & Publish' : 'Publish Ad')}
              </button>
            </div>
            
            {loading && <div className="loading-msg">Processing mock payment... please wait.</div>}
            {paymentSuccess && <div className="success-msg">Payment successful! Publishing...</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitAd;
