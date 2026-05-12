import { Routes, Route, Outlet } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import CategoryPage from './pages/CategoryPage';
import ItemDetail from './pages/ItemDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminUpload from './pages/AdminUpload';

import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Routes with Header & Footer */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:category" element={<CategoryPage />} />
        <Route path="item/:code" element={<ItemDetail />} />
      </Route>

      {/* Admin Login (Public Layout without Footer/WhatsApp) */}
      <Route path="/admin/login" element={
        <>
          <Header />
          <AdminLogin />
        </>
      } />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="upload" element={<AdminUpload />} />
        <Route path="edit/:id" element={<AdminUpload />} />
      </Route>
    </Routes>
  );
}

// Wrapper for public pages that need Header, Footer, and Floating WhatsApp
function PublicLayout() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
