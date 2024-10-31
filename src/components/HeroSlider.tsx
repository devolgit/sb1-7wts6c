import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export default function HeroSlider() {
  const { settings } = useSite();

  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-12 pb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Trusted NRI Services Partner
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive solutions for all your needs back home
          </p>
        </motion.div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="w-full pt-12 pb-16"
        >
          {settings.heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="w-[300px] sm:w-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
                      <p className="text-sm text-gray-200">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}