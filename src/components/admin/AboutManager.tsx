import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSite } from '../../context/SiteContext';

function AboutManager() {
  const { settings, updateAbout } = useSite();
  const { about } = settings;

  const [editMode, setEditMode] = useState({
    stats: false,
    ceo: false,
    education: false,
    experience: false,
    achievements: false,
    mission: false
  });

  const [formData, setFormData] = useState({
    stats: [...about.stats],
    ceo: { ...about.ceo },
    education: [...about.education],
    experience: [...about.experience],
    achievements: [...about.achievements],
    mission: about.mission,
    vision: about.vision
  });

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const handleCEOChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      ceo: { ...formData.ceo, [field]: value }
    });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleSave = (section: keyof typeof editMode) => {
    updateAbout(formData);
    setEditMode({ ...editMode, [section]: false });
    toast.success(`${section} updated successfully!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold">Manage About Page</h2>

      {/* Stats Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Statistics</h3>
          <button
            onClick={() => setEditMode({ ...editMode, stats: !editMode.stats })}
            className="text-blue-600 hover:text-blue-700"
          >
            {editMode.stats ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
        <div className="grid gap-4">
          {formData.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              {editMode.stats ? (
                <>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="px-3 py-2 border rounded"
                  />
                </>
              ) : (
                <>
                  <span className="font-semibold">{stat.value}</span>
                  <span>{stat.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
        {editMode.stats && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleSave('stats')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </section>

      {/* CEO Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">CEO Profile</h3>
          <button
            onClick={() => setEditMode({ ...editMode, ceo: !editMode.ceo })}
            className="text-blue-600 hover:text-blue-700"
          >
            {editMode.ceo ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
        {editMode.ceo ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.ceo.name}
                onChange={(e) => handleCEOChange('name', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.ceo.title}
                onChange={(e) => handleCEOChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={formData.ceo.bio}
                onChange={(e) => handleCEOChange('bio', e.target.value)}
                className="w-full px-3 py-2 border rounded"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={formData.ceo.image}
                onChange={(e) => handleCEOChange('image', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleSave('ceo')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Name:</strong> {formData.ceo.name}</p>
            <p><strong>Title:</strong> {formData.ceo.title}</p>
            <p><strong>Bio:</strong> {formData.ceo.bio}</p>
            <img src={formData.ceo.image} alt={formData.ceo.name} className="w-32 h-32 object-cover rounded" />
          </div>
        )}
      </section>

      {/* Education Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <button
            onClick={() => setEditMode({ ...editMode, education: !editMode.education })}
            className="text-blue-600 hover:text-blue-700"
          >
            {editMode.education ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
        <div className="space-y-4">
          {formData.education.map((edu, index) => (
            <div key={index} className="border-b pb-4">
              {editMode.education ? (
                <div className="grid gap-2">
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Year"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Institution"
                  />
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Location"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-sm text-blue-600">{edu.year}</p>
                  <p className="font-semibold">{edu.degree}</p>
                  <p>{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.location}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {editMode.education && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleSave('education')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Experience</h3>
          <button
            onClick={() => setEditMode({ ...editMode, experience: !editMode.experience })}
            className="text-blue-600 hover:text-blue-700"
          >
            {editMode.experience ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
        <div className="space-y-4">
          {formData.experience.map((exp, index) => (
            <div key={index} className="border-b pb-4">
              {editMode.experience ? (
                <div className="grid gap-2">
                  <input
                    type="text"
                    value={exp.year}
                    onChange={(e) => handleExperienceChange(index, 'year', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Year"
                  />
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Role"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="px-3 py-2 border rounded"
                    placeholder="Company"
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    className="px-3 py-2 border rounded"
                    rows={3}
                    placeholder="Description"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-sm text-blue-600">{exp.year}</p>
                  <p className="font-semibold">{exp.role}</p>
                  <p>{exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {editMode.experience && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleSave('experience')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </section>

      {/* Mission & Vision */}
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Mission & Vision</h3>
          <button
            onClick={() => setEditMode({ ...editMode, mission: !editMode.mission })}
            className="text-blue-600 hover:text-blue-700"
          >
            {editMode.mission ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
        {editMode.mission ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mission</label>
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Vision</label>
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleSave('mission')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Mission</h4>
              <p className="text-gray-600">{formData.mission}</p>
            </div>
            <div>
              <h4 className="font-medium">Vision</h4>
              <p className="text-gray-600">{formData.vision}</p>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
}

export default AboutManager;