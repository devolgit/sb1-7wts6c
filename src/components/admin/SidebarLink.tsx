import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

function SidebarLink({ icon: Icon, label, isActive, onClick, className = '' }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-2 px-6 py-3 text-left transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      } ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

export default SidebarLink;