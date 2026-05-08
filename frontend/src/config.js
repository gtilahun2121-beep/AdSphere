// In production: VITE_API_URL is empty → API calls go to same origin (backend serves frontend)
// In development: Falls back to localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:5000';

export default API_BASE_URL;
