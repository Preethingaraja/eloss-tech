// Central config — reads from Vite environment variables
// Set VITE_BACKEND_URL in your .env (local) or in Vercel's Environment Variables (production)
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
export const API_URL = `${BACKEND_URL}/api`;
