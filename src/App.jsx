import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import Tracker from './components/Tracker';
import Home from './pages/Home';
import About from './pages/About';
import Leaders from './pages/Leaders';
import Portfolio from './pages/Portfolio';
import Classes from './pages/Classes';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import CompanyNews from './pages/CompanyNews';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import CookiePolicy from './pages/CookiePolicy';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import DigitalForms from './pages/DigitalForms';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Admin route guard — redirects to /admin if not logged in as admin
function AdminRoute({ children }) {
  const admin = localStorage.getItem('eloss_admin');
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
}

// User route guard — redirects to /login if not logged in as user
function PrivateRoute({ children }) {
  const user = localStorage.getItem('eloss_user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Public site layout — Navbar + Footer + Chatbot visible to ALL visitors (no auth gate)
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Chatbot />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Tracker />
      <Routes>
        {/* ── Protected Main Pages ── */}
        <Route path="/"        element={<PrivateRoute><PublicLayout><Home /></PublicLayout></PrivateRoute>} />
        <Route path="/about"   element={<PrivateRoute><PublicLayout><About /></PublicLayout></PrivateRoute>} />
        <Route path="/leaders" element={<PrivateRoute><PublicLayout><Leaders /></PublicLayout></PrivateRoute>} />
        <Route path="/portfolio" element={<PrivateRoute><PublicLayout><Portfolio /></PublicLayout></PrivateRoute>} />
        <Route path="/classes" element={<PrivateRoute><PublicLayout><Classes /></PublicLayout></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><PublicLayout><Courses /></PublicLayout></PrivateRoute>} />
        <Route path="/blog"    element={<PrivateRoute><PublicLayout><Blogs /></PublicLayout></PrivateRoute>} />
        <Route path="/careers" element={<PrivateRoute><PublicLayout><Careers /></PublicLayout></PrivateRoute>} />
        <Route path="/news"    element={<PrivateRoute><PublicLayout><CompanyNews /></PublicLayout></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><PublicLayout><Services /></PublicLayout></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><PublicLayout><Contact /></PublicLayout></PrivateRoute>} />
        
        {/* ── Public Legal & Auth Pages ── */}
        <Route path="/cookie-policy" element={<PublicLayout><CookiePolicy /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="/refund-policy" element={<PublicLayout><RefundPolicy /></PublicLayout>} />
        <Route path="/digital-forms" element={<PublicLayout><DigitalForms /></PublicLayout>} />

        {/* ── Auth ── */}
        <Route path="/login" element={<Login />} />

        {/* ── Admin — protected, no Navbar/Footer ── */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
