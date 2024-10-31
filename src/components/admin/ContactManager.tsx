import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSite } from '../../context/SiteContext';

function ContactManager() {
  const { settings, updateContactInfo } = useSite();
  const [phones, setPhones] = useState(settings.contact.phones);
  const [emails, setEmails] = useState(settings.contact.emails);
  const [address, setAddress] = useState(settings.contact.address);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo({
      phones,
      emails,
      address,
    });
    toast.success('Contact information updated successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Numbers
          </label>
          <div className="space-y-2">
            {phones.map((phone, index) => (
              <input
                key={index}
                type="tel"
                value={phone}
                onChange={(e) => {
                  const newPhones = [...phones];
                  newPhones[index] = e.target.value;
                  setPhones(newPhones);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Addresses
          </label>
          <div className="space-y-2">
            {emails.map((email, index) => (
              <input
                key={index}
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...emails];
                  newEmails[index] = e.target.value;
                  setEmails(newEmails);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Office Address
          </label>
          <textarea
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </motion.div>
  );
}

export default ContactManager;