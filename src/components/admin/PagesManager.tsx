import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

function PagesManager() {
  const [pages, setPages] = useState([
    { id: 1, title: 'Home', slug: '/', isSystem: true },
    { id: 2, title: 'Services', slug: '/services', isSystem: true },
    { id: 3, title: 'About', slug: '/about', isSystem: true },
    { id: 4, title: 'Contact', slug: '/contact', isSystem: true },
    { id: 5, title: 'Custom Page', slug: '/custom', isSystem: false },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setPages(pages.filter(page => page.id !== id));
    toast.success('Page deleted successfully!');
  };

  const handleAdd = () => {
    const newPage = {
      id: Date.now(),
      title: 'New Page',
      slug: '/new-page',
      isSystem: false
    };
    setPages([...pages, newPage]);
    setEditingId(newPage.id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    toast.success('Page updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Pages</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Page</span>
        </button>
      </div>

      <div className="grid gap-4">
        {pages.map(page => (
          <div
            key={page.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            {editingId === page.id ? (
              <div className="flex-1 mr-4 space-y-2">
                <input
                  type="text"
                  defaultValue={page.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Page Title"
                />
                <input
                  type="text"
                  defaultValue={page.slug}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Page Slug"
                />
              </div>
            ) : (
              <div className="flex-1">
                <h3 className="font-semibold">{page.title}</h3>
                <p className="text-gray-600">{page.slug}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <a
                href={page.slug}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Eye className="w-5 h-5" />
              </a>
              {!page.isSystem && (
                <>
                  {editingId === page.id ? (
                    <button
                      onClick={() => handleSave(page.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(page.id)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default PagesManager;