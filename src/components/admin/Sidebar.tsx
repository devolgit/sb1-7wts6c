import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Layout, Grid, Phone, LogOut, Palette, Globe2, MessageSquare, Image, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'general', icon: Settings, label: 'General Settings' },
    { id: 'hero', icon: Image, label: 'Hero Slider' },
    { id: 'services', icon: Grid, label: 'Services' },
    { id: 'about', icon: Info, label: 'About Page' },
    { id: 'pages', icon: Layout, label: 'Pages' },
    { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
    { id: 'contact', icon: Phone, label: 'Contact Info' },
    { id: 'theme', icon: Palette, label: 'Theme' },
  ];

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white shadow-lg min-h-screen flex flex-col"
    >
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Globe2 className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Manage your website</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
}