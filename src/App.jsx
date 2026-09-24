import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { InquiryProvider, useInquiry } from './context/InquiryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScheduleModal from './components/ScheduleModal';
import AdminLoginDrawer from './components/AdminLoginDrawer';
import LightningCursor from './components/LightningCursor';
import LoadingScreen from './components/LoadingScreen';
import SEO from './components/SEO';

// Code-split page bundles for minimal initial bundle size and instant loading
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ValuesPage = lazy(() => import('./pages/ValuesPage'));
const MissionPage = lazy(() => import('./pages/MissionPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));

// Scroll to top helper on page change & close modal drawers
function ScrollToTop() {
  const { pathname } = useLocation();
  const { closeAdminLogin } = useInquiry();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    closeAdminLogin();
  }, [pathname, closeAdminLogin]);
  return null;
}

// Lightweight route transition fallback
function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div>
    </div>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAdminLoginOpen, closeAdminLogin, openModal, closeModal, modalConfig } = useInquiry();

  return (
    <Router>
      <ScrollToTop />
      <SEO />
      <LightningCursor />
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      <div className="min-h-screen bg-[#120722] text-[#f1f1f6] relative flex flex-col justify-between selection:bg-amber-500/30 selection:text-white">
        <Navbar onOpenSchedule={openModal} />

        <main className="flex-1">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage onOpenSchedule={openModal} />} />
              <Route path="/about" element={<AboutPage onOpenSchedule={openModal} />} />
              <Route path="/services" element={<ServicesPage onOpenSchedule={openModal} />} />
              <Route path="/capabilities" element={<ProductsPage onOpenSchedule={openModal} />} />
              <Route path="/values" element={<ValuesPage />} />
              <Route path="/mission" element={<MissionPage onOpenSchedule={openModal} />} />
              <Route path="/clients" element={<ClientsPage onOpenSchedule={openModal} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        <ScheduleModal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
        />

        <AdminLoginDrawer
          isOpen={isAdminLoginOpen}
          onClose={closeAdminLogin}
        />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <InquiryProvider>
      <AppContent />
    </InquiryProvider>
  );
}
