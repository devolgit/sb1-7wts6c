import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, FileCheck, Users, Calendar, Globe2, Building2, Shield } from 'lucide-react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

// Icon mapping object
const iconMap: { [key: string]: LucideIcon } = {
  FileCheck,
  Users,
  Calendar,
  Globe2,
  Building2,
  Shield
};

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  // Get the icon component from the mapping, fallback to FileCheck if not found
  const IconComponent = iconMap[icon] || FileCheck;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <IconComponent className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export default ServiceCard;