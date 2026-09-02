import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, X, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import type { PhotoItem } from '../../types';

export const GallerySection: React.FC = () => {
  const { playSound } = useApp();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('swipe');
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openLightbox = (photo: PhotoItem) => {
    playSound('click');
    setSelectedPhoto(photo);
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badgeText="Favorite Memories"
          badgeEmoji="📸"
          title="Snapshots of Our Favorite Times"
          subtitle="Tap any polaroid to flip it and uncover the hidden inside jokes on the back!"
        />

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {siteConfig.photos.map((photo, idx) => {
            const isFlipped = !!flippedCards[photo.id];

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="perspective-1000 cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <motion.div
                  whileHover={{ scale: 1.04, y: -6 }}
                  animate={{ rotate: photo.rotation }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative h-[380px] w-full [transform-style:preserve-3d] transition-transform duration-500"
                  style={{ transform: isFlipped ? 'rotateY(180deg)' : `rotate(${photo.rotation}deg)` }}
                >
                  {/* FRONT SIDE (Polaroid Photo + Caption) */}
                  <div className="absolute inset-0 w-full h-full bg-white p-4 pb-6 rounded-2xl shadow-xl flex flex-col justify-between border border-gray-100 [backface-visibility:hidden]">
                    {/* Washi Tape Graphic */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#FFE066]/70 backdrop-blur-xs rounded-sm rotate-1 shadow-xs border border-amber-200/50 z-20 flex items-center justify-center">
                      <span className="text-[10px] font-extrabold text-amber-900/60 uppercase">
                        {photo.date || 'Memory'}
                      </span>
                    </div>

                    {/* Photo Container */}
                    <div className="relative w-full h-[250px] rounded-xl overflow-hidden bg-gray-100 mt-2">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {/* Dino Stamp Sticker on corner of photo #2 and #5 */}
                      {(idx === 1 || idx === 4) && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-[#FF3EA5] shadow-xs flex items-center gap-1">
                          <span>🦕</span>
                          <span>VIP</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Caption & Flip Button */}
                    <div className="mt-3 flex items-center justify-between gap-2 px-1">
                      <p className="font-handwriting text-lg sm:text-xl font-bold text-gray-800 line-clamp-1">
                        {photo.caption}
                      </p>
                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        title="Flip card for secret note"
                        className="p-2 rounded-full bg-pink-50 text-[#FF3EA5] hover:bg-[#FF3EA5] hover:text-white transition-all transform hover:rotate-180"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* BACK SIDE (Secret Note / Inside Joke) */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFF9F0] via-pink-50 to-purple-50 p-6 rounded-2xl shadow-xl flex flex-col justify-between border-2 border-dashed border-[#FF3EA5]/40 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF3EA5]/15 text-[#FF3EA5] font-bold text-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>Secret Note</span>
                      </div>
                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="p-1.5 rounded-full bg-white shadow-xs text-gray-600 hover:text-[#FF3EA5]"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="my-auto text-center px-2">
                      <p className="font-handwriting text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed">
                        "{photo.note || photo.caption}"
                      </p>
                    </div>

                    <div className="text-center">
                      <span className="text-xs font-bold text-[#8B5CF6]">
                        Tap to zoom photo 🔍
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-xl w-full p-6 rounded-3xl overflow-hidden relative cursor-default border border-white/50"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-gray-900">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl font-bold text-gray-900">
                  {selectedPhoto.caption}
                </p>
                {selectedPhoto.note && (
                  <p className="mt-2 text-sm text-gray-600 bg-pink-50 p-3 rounded-xl border border-pink-100">
                    💡 {selectedPhoto.note}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
