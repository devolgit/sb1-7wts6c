import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, FileCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSite } from '../../context/SiteContext';

function ServicesManager() {
  const { settings, updateServices } = useSite();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    details: [] as string[]
  });

  const handleDelete = (id: number) => {
    const updatedServices = settings.services.filter(service => service.id !== id);
    updateServices(updatedServices);
    toast.success('Service deleted successfully!');
  };

  const handleAdd = () => {
    const newService = {
      id: Date.now(),
      title: 'New Service',
      description: 'Service description',
      icon: 'FileCheck',
      details: ['Detail 1', 'Detail 2']
    };
    updateServices([...settings.services, newService]);
    setEditingId(newService.id);
    setEditForm({
      title: newService.title,
      description: newService.description,
      details: newService.details
    });
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    setEditForm({
      title: service.title,
      description: service.description,
      details: service.details || []
    });
  };

  const handleSave = (id: number) => {
    const updatedServices = settings.services.map(service =>
      service.id === id
        ? {
            ...service,
            title: editForm.title,
            description: editForm.description,
            details: editForm.details
          }
        : service
    );
    updateServices(updatedServices);
    setEditingId(null);
    toast.success('Service updated successfully!');
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...editForm.details];
    newDetails[index] = value;
    setEditForm({ ...editForm, details: newDetails });
  };

  const addDetail = () => {
    setEditForm({
      ...editForm,
      details: [...editForm.details, '']
    });
  };

  const removeDetail = (index: number) => {
    const newDetails = editForm.details.filter((_, i) => i !== index);
    setEditForm({ ...editForm, details: newDetails });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid gap-4">
        {settings.services.map(service => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            {editingId === service.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Service Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Service Description"
                />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Service Details</h4>
                    <button
                      onClick={addDetail}
                      className="text-blue-600 text-sm hover:text-blue-700"
                    >
                      + Add Detail
                    </button>
                  </div>
                  {editForm.details.map((detail, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => handleDetailChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Service Detail"
                      />
                      <button
                        onClick={() => removeDetail(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(service.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <FileCheck className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                  {service.details && service.details.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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

export default ServicesManager;