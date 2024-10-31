import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

function ThemeManager() {
  const [colors, setColors] = useState({
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Theme updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key} Color
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Preview</h3>
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.background }}
          >
            <h4
              className="text-xl font-bold mb-2"
              style={{ color: colors.text }}
            >
              Sample Heading
            </h4>
            <button
              className="px-4 py-2 rounded-lg text-white mr-2"
              style={{ backgroundColor: colors.primary }}
            >
              Primary Button
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: colors.secondary }}
            >
              Secondary Button
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Theme</span>
        </button>
      </form>
    </motion.div>
  );
}

export default ThemeManager;