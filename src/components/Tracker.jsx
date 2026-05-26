import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API = `http://${window.location.hostname}:5000/api`;

export default function Tracker() {
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('eloss_user') || 'null');
    
    const trackVisit = async () => {
      const data = {
        userId: user?.id || null,
        page_url: window.location.href,
        referrer: document.referrer,
        device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        browser: navigator.userAgent
      };

      try {
        await fetch(`${API}/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (error) {
        console.error('Tracking error:', error);
      }
    };

    trackVisit();
  }, [location]);

  return null;
}
