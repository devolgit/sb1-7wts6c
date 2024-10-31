import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe } from 'lucide-react';
import { useSite } from '../context/SiteContext';

function About() {
  const { settings, icons } = useSite();
  const { about } = settings;

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {about.stats.map((stat, index) => {
            const IconComponent = icons[stat.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* CEO Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="relative h-96 md:h-full">
                <img
                  src={about.ceo.image}
                  alt={`${about.ceo.name} - ${about.ceo.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:hidden">
                    <h2 className="text-2xl font-bold">{about.ceo.name}</h2>
                    <p className="text-blue-200">{about.ceo.title}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="hidden md:block mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{about.ceo.name}</h2>
                <p className="text-xl text-blue-600">{about.ceo.title}</p>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">{about.ceo.bio}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <a href={`mailto:${about.ceo.email}`} className="flex items-center text-gray-600 hover:text-blue-600">
                    <Mail className="w-5 h-5 mr-2" />
                    {about.ceo.email}
                  </a>
                  <a href={`https://${about.ceo.linkedin}`} className="flex items-center text-gray-600 hover:text-blue-600">
                    <Globe className="w-5 h-5 mr-2" />
                    {about.ceo.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            {about.education.map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-sm text-blue-600 mb-1">{edu.year}</div>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500 text-sm">{edu.location}</p>
              </div>
            ))}
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
            {about.experience.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-sm text-blue-600 mb-1">{exp.year}</div>
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <p className="text-gray-600 font-medium">{exp.company}</p>
                <p className="text-gray-500 mt-2">{exp.description}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Awards & Recognition</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {about.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start space-x-3"
              >
                <Globe className="w-6 h-6 text-blue-200 flex-shrink-0" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <Globe className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">{about.mission}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <Globe className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">{about.vision}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;