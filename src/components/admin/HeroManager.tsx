import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSite } from '../../context/SiteContext';

function HeroManager() {
  const { settings, updateHeroSlides } = useSite();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    image: '',
    title: '',
    description: ''
  });

  const handleDelete = (id: number) => {
    const updatedSlides = settings.heroSlides.filter(slide => slide.id !== id);
    updateHeroSlides(updatedSlides);
    toast.success('Slide deleted successfully!');
  };

  const handleAdd = () => {
    const newSlide = {
      id: Date.now(),
      image: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      title: 'New Slide',
      description: 'Slide description'
    };
    updateHeroSlides([...settings.heroSlides, newSlide]);
    setEditingId(newSlide.id);
    setEditForm({
      image: newSlide.image,
      title: newSlide.title,
      description: newSlide.description
    });
  };

  const handleEdit = (slide: any) => {
    setEditingId(slide.id);
    setEditForm({
      image: slide.image,
      title: slide.title,
      description: slide.description
    });
  };

  const handleSave = (id: number) => {
    const updatedSlides = settings.heroSlides.map(slide =>
      slide.id === id
        ? {
            ...slide,
            image: editForm.image,
            title: editForm.title,
            description: editForm.description
          }
        : slide
    );
    updateHeroSlides(updatedSlides);
    setEditingId(null);
    toast.success('Slide updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Hero Slider</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slide</span>
        </button>
      </div>

      <div className="grid gap-4">
        {settings.heroSlides.map(slide => (
          <div
            key={slide.id}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            {editingId === slide.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Slide Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="Slide Description"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(slide.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-4">
                <div className="w-40 h-24 rounded-lg overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{slide.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{slide.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroManager;