import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitAd from './pages/SubmitAd';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="bg-slider-container">
        <div className="bg-slide"></div>
        <div className="bg-slide"></div>
        <div className="bg-slide"></div>
      </div>
      
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit" element={<SubmitAd />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
