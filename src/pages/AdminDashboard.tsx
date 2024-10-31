import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Layout, Grid, Phone, LogOut, Palette, FileText } from 'lucide-react';
import SidebarLink from '../components/admin/SidebarLink';
import GeneralSettings from '../components/admin/GeneralSettings';
import ServicesManager from '../components/admin/ServicesManager';
import PagesManager from '../components/admin/PagesManager';
import ContactManager from '../components/admin/ContactManager';
import ThemeManager from '../components/admin/ThemeManager';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('general');

  const handleLogout = () => {
    // Add logout logic here
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-lg"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600">Manage your website</p>
        </div>
        
        <nav className="mt-8">
          <SidebarLink
            icon={Settings}
            label="General Settings"
            isActive={activeTab === 'general'}
            onClick={() => setActiveTab('general')}
          />
          <SidebarLink
            icon={Grid}
            label="Services"
            isActive={activeTab === 'services'}
            onClick={() => setActiveTab('services')}
          />
          <SidebarLink
            icon={Layout}
            label="Pages"
            isActive={activeTab === 'pages'}
            onClick={() => setActiveTab('pages')}
          />
          <SidebarLink
            icon={Phone}
            label="Contact Info"
            isActive={activeTab === 'contact'}
            onClick={() => setActiveTab('contact')}
          />
          <SidebarLink
            icon={Palette}
            label="Theme"
            isActive={activeTab === 'theme'}
            onClick={() => setActiveTab('theme')}
          />
          <SidebarLink
            icon={LogOut}
            label="Logout"
            onClick={handleLogout}
            className="mt-auto text-red-600"
          />
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'general' && <GeneralSettings />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab === 'pages' && <PagesManager />}
        {activeTab === 'contact' && <ContactManager />}
        {activeTab === 'theme' && <ThemeManager />}
      </div>
    </div>
  );
}

export default AdminDashboard;