import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    title: 'NRI Services',
    metaDescription: 'Comprehensive NRI services for all your needs',
    favicon: null as File | null,
    faviconPreview: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSettings({
        ...settings,
        favicon: file,
        faviconPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    toast.success('Settings updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center space-x-4 mb-8">
        <Globe className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">General Settings</h2>
          <p className="text-gray-600">Configure your website's basic settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website Title
            </label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              rows={4}
              value={settings.metaDescription}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              This description appears in search engine results.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon
            </label>
            <div className="flex items-center space-x-4">
              {settings.faviconPreview && (
                <img
                  src={settings.faviconPreview}
                  alt="Favicon preview"
                  className="w-10 h-10 rounded border"
                />
              )}
              <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Upload New Favicon</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}