// app/components/DressImageSlider.js
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegHeart } from "react-icons/fa"; // Import de l'icône de cœur

export default function DressImageSlider({ allImages, robe }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageContainerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);

  /*** Gestion du swipe sur l'image principale ***/
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const touchX = e.touches[0].clientX;
    dragDeltaRef.current = touchX - touchStartXRef.current;

    // Applique une translation pour l'effet de suivi
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translateX(${dragDeltaRef.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Détermine si on change d'image
    const threshold = 50; // Seuil de déplacement
    if (Math.abs(dragDeltaRef.current) > threshold) {
      if (dragDeltaRef.current > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }

    // Réinitialise la translation
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = 'translateX(0)';
    }
    dragDeltaRef.current = 0;
  };

  const nextImage = () => {
    setIsZoomed(false);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setIsZoomed(false);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  const handleAddToFavorites = (dress) => {
    // Logique pour ajouter la robe aux favoris
    console.log("Ajouter aux favoris :", dress);
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div
        ref={imageContainerRef}
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[3/5]"
        onClick={() => setIsFullScreen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animation de fondu pour l'image principale */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Image principale */}
            <div className="relative w-full h-full">
              <Image
                src={
                  allImages[currentImageIndex]?.optimizedImages?.slider
                    ?.desktop ||
                  allImages[currentImageIndex]?.optimizedImages?.slider
                    ?.mobile ||
                  allImages[currentImageIndex]?.imageUrl
                }
                alt={robe.dressName}
                fill
                style={{ objectFit: "cover" }} // Modifier objectFit à "cover"
                sizes="(max-width: 768px) 95vw, 50vw"
                quality={95}
                priority
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bouton Favoris */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorites(robe); // Utilisation de la robe actuelle
          }}
          className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
        >
          <FaRegHeart size={20} />
        </button>

        {/* Boutons de navigation */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 text-[#af7749] rounded-full p-2 hover:bg-[#af7749]/70 hover:text-white transition-colors duration-300 border-2 border-[#af7749]"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
        >
          ◀
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 text-[#af7749] rounded-full p-2 hover:bg-[#af7749]/70 hover:text-white transition-colors duration-300 border-2 border-[#af7749]"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          ▶
        </button>
      </div>

      {/* Miniatures */}
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {allImages.map((img, index) => (
          <div
            key={index}
            className={`relative min-w-[80px] w-[80px] h-[120px] cursor-pointer ${
              currentImageIndex === index ? "ring-2 ring-[#af7749]" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={img.optimizedImages?.gallery?.mobile || img.imageUrl}
              alt={`${robe.dressName} - vue ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover rounded"
              quality={85}
            />
          </div>
        ))}
      </div>

      {/* Mode plein écran avec images optimisées */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <button
              className="absolute z-20 top-5 right-5 text-white text-3xl"
              onClick={() => {
                setIsFullScreen(false);
                setIsZoomed(false);
              }}
            >
              ✕
            </button>

            {/* Bouton Favoris en mode plein écran */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToFavorites(robe); // Utilisation de la robe actuelle
              }}
              className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
            >
              <FaRegHeart size={20} />
            </button>

            {/* Boutons de navigation en mode plein écran */}
            <button
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              onClick={prevImage}
            >
              ◀
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {/* Animation de fondu pour l'image en mode plein écran */}
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentImageIndex}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  {/* Image en mode plein écran */}
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        allImages[currentImageIndex]?.optimizedImages?.slider
                          ?.desktop ||
                        allImages[currentImageIndex]?.optimizedImages?.slider
                          ?.mobile ||
                        allImages[currentImageIndex]?.imageUrl
                      }
                      alt={robe.dressName}
                      fill
                      quality={100}
                      style={{ objectFit: "cover" }} // Modifier objectFit à "cover"
                      className={`transition-transform duration-300 p-4 ${
                        isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                      }`}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              onClick={nextImage}
            >
              ▶
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}