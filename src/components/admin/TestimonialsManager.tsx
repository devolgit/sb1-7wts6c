import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, Star, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSite } from '../../context/SiteContext';

function TestimonialsManager() {
  const { settings, updateTestimonials } = useSite();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    image: '',
    comment: '',
    rating: 5
  });

  const handleDelete = (id: number) => {
    const updatedTestimonials = settings.testimonials.filter(testimonial => testimonial.id !== id);
    updateTestimonials(updatedTestimonials);
    toast.success('Testimonial deleted successfully!');
  };

  const handleAdd = () => {
    const newTestimonial = {
      id: Date.now(),
      name: '',
      location: '',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      comment: '',
      rating: 5
    };
    updateTestimonials([...settings.testimonials, newTestimonial]);
    setEditingId(newTestimonial.id);
    setEditForm({
      name: newTestimonial.name,
      location: newTestimonial.location,
      image: newTestimonial.image,
      comment: newTestimonial.comment,
      rating: newTestimonial.rating
    });
  };

  const handleEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setEditForm({
      name: testimonial.name,
      location: testimonial.location,
      image: testimonial.image,
      comment: testimonial.comment,
      rating: testimonial.rating
    });
  };

  const handleSave = (id: number) => {
    const updatedTestimonials = settings.testimonials.map(testimonial =>
      testimonial.id === id
        ? {
            ...testimonial,
            name: editForm.name,
            location: editForm.location,
            image: editForm.image,
            comment: editForm.comment,
            rating: editForm.rating
          }
        : testimonial
    );
    updateTestimonials(updatedTestimonials);
    setEditingId(null);
    toast.success('Testimonial updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid gap-4">
        {settings.testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            {editingId === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Client Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

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
                    Testimonial
                  </label>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Client's testimonial..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setEditForm({ ...editForm, rating })}
                        className={`p-1 rounded-full focus:outline-none ${
                          rating <= editForm.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(testimonial.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    <p className="text-gray-600 mt-2">{testimonial.comment}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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

export default TestimonialsManager;