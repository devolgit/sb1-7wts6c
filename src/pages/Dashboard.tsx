import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import GeneralSettings from '../components/admin/GeneralSettings';
import ServicesManager from '../components/admin/ServicesManager';
import PagesManager from '../components/admin/PagesManager';
import ContactManager from '../components/admin/ContactManager';
import ThemeManager from '../components/admin/ThemeManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import HeroManager from '../components/admin/HeroManager';
import AboutManager from '../components/admin/AboutManager';
import Sidebar from '../components/admin/Sidebar';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = React.useState('general');

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'hero':
        return <HeroManager />;
      case 'services':
        return <ServicesManager />;
      case 'pages':
        return <PagesManager />;
      case 'contact':
        return <ContactManager />;
      case 'theme':
        return <ThemeManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'about':
        return <AboutManager />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}