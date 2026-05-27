// Central config — reads from Vite environment variables
// Set VITE_BACKEND_URL in your .env (local) or in Vercel's Environment Variables (production)
let backendUrl = import.meta.env.VITE_BACKEND_URL;

// If testing on a local network device (e.g. mobile phone), 
// fallback to the local IP instead of 'localhost'
if (!backendUrl || (backendUrl.includes('localhost') && window.location.hostname !== 'localhost')) {
  backendUrl = `http://${window.location.hostname}:5000`;
}

export const BACKEND_URL = backendUrl;
export const API_URL = `${BACKEND_URL}/api`;
