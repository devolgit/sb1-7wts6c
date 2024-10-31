import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Mail, Phone, MapPin } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Footer() {
  const { settings } = useSite();
  const { phones, emails, address } = settings.contact;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Globe2 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">{settings.general.title}</span>
            </div>
            <p className="text-gray-400">
              {settings.general.metaDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {settings.services.map((service) => (
                <li key={service.id} className="text-gray-400">{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {phones.map((phone, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>{phone}</span>
                </li>
              ))}
              {emails.map((email, index) => (
                <li key={index} className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{email}</span>
                </li>
              ))}
              <li className="flex items-start text-gray-400">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span style={{ whiteSpace: 'pre-line' }}>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.general.title}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}