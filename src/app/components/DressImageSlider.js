"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import MobileActions from "./MobileActions";

export default function DressImageSlider({ allImages, robe }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const imageContainerRef = useRef(null);
  const fullScreenImageRef = useRef(null);
  const touchStartXRef = useRef(0);
  const [touchStartX, setTouchStartX] = useState(0); // Pour le drag
  const [touchStartY, setTouchStartY] = useState(0); // Pour le drag
  const [dragStartX, setDragStartX] = useState(0); // Pour le drag
  const [dragStartY, setDragStartY] = useState(0); // Pour le drag
  const dragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // Pour le drag

  // --- Fonctions pour centrer l'image (modifiée pour le pan) ---
  const centerImage = () => {
    if (fullScreenImageRef.current) {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const imageWidth = fullScreenImageRef.current.offsetWidth * scale; // Largeur *après* zoom
      const imageHeight = fullScreenImageRef.current.offsetHeight * scale; // Hauteur *après* zoom

      // Limites pour empêcher l'image de sortir du conteneur
      const maxX = Math.max(0, (imageWidth - containerWidth) / 2);
      const maxY = Math.max(0, (imageHeight - containerHeight) / 2);

      // Centre l'image initialement, ou ajuste si elle dépasse les limites
      const newOffsetX = Math.max(
        -maxX,
        Math.min(maxX, (containerWidth - imageWidth) / 2)
      );
      const newOffsetY = Math.max(
        -maxY,
        Math.min(maxY, (containerHeight - imageHeight) / 2)
      );

      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    }
  };

  // recentrer à l'ouverture et au redimensionnement, et après un zoom
  useEffect(() => {
    if (isFullScreen) {
      centerImage();
      window.addEventListener("resize", centerImage);
    }

    return () => {
      window.removeEventListener("resize", centerImage);
    };
  }, [isFullScreen, scale]); // Dépendances: isFullScreen ET scale

  // --- Fonctions pour le slider principal (pas de changement) ---
  const handleTouchStart = (e) => {
    if (isFullScreen) return;
    touchStartXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (isFullScreen) return;
    if (!isDraggingRef.current) return;
    const touchX = e.touches[0].clientX;
    dragDeltaRef.current = touchX - touchStartXRef.current;

    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = `translateX(${dragDeltaRef.current}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (isFullScreen) return;
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const threshold = 50;
    if (Math.abs(dragDeltaRef.current) > threshold) {
      if (dragDeltaRef.current > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }

    if (imageContainerRef.current) {
      imageContainerRef.current.style.transform = "translateX(0)";
    }
    dragDeltaRef.current = 0;
  };

  const nextImage = () => {
    setIsZoomed(false);
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    centerImage(); // recentrer après changement d'image
  };

  const prevImage = () => {
    setIsZoomed(false);
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
    centerImage(); // recentrer après changement d'image
  };

  const handleAddToFavorites = (dress) => {
    console.log("Ajouter aux favoris :", dress);
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  // --- Gestion du swipe en mode plein écran ---
  const handleFullScreenTouchStart = (e) => {
    if (!isZoomed) {
      // Swipe si pas zoomé
      touchStartXRef.current = e.touches[0].clientX;
      isDraggingRef.current = true;
    } else {
      // Pan si zoomé
      setIsDragging(true);
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
      setDragStartX(offsetX); // Important: partir du décalage actuel
      setDragStartY(offsetY);
    }
  };

  const handleFullScreenTouchMove = (e) => {
    if (!isZoomed) {
      // Swipe si pas zoomé
      if (!isDraggingRef.current) return;
      const touchX = e.touches[0].clientX;
      dragDeltaRef.current = touchX - touchStartXRef.current;
      // Pas de translation, on change d'image dans TouchEnd
    } else {
      // Pan si zoomé
      if (!isDragging) return;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - touchStartX;
      const deltaY = touchY - touchStartY;

      // Calcul des nouvelles positions, limitées pour ne pas sortir de l'image
      let newOffsetX = dragStartX + deltaX;
      let newOffsetY = dragStartY + deltaY;

      if (fullScreenImageRef.current) {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const imageWidth = fullScreenImageRef.current.offsetWidth * scale;
        const imageHeight = fullScreenImageRef.current.offsetHeight * scale;

        // Limites pour empêcher l'image de sortir du conteneur
        const maxX = Math.max(0, (imageWidth - containerWidth) / 2);
        const maxY = Math.max(0, (imageHeight - containerHeight) / 2);

        newOffsetX = Math.max(-maxX, Math.min(maxX, newOffsetX));
        newOffsetY = Math.max(-maxY, Math.min(maxY, newOffsetY));
      }

      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    }
  };

  const handleFullScreenTouchEnd = () => {
    if (!isZoomed) {
      // Swipe si pas zoomé
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      const threshold = 50;
      if (Math.abs(dragDeltaRef.current) > threshold) {
        if (dragDeltaRef.current > 0) {
          prevImage();
        } else {
          nextImage();
        }
      }
      dragDeltaRef.current = 0;
    } else {
      // Pan si zoomé
      setIsDragging(false);
    }
  };

  // --- Gestion du zoom (avec pan) ---
  const toggleZoom = (e) => {
    e.stopPropagation();
    if (isZoomed) {
      setScale(1);
      setOffsetX(0);
      setOffsetY(0);
      setIsZoomed(false);
      centerImage();
    } else {
      setScale(2);
      setIsZoomed(true);
      centerImage(); // Centrer après le zoom
    }
  };

  const handleImageLoad = () => {
    // Cette fonction est appelée après le chargement de l'image.
    // Avec Next/Image, vous n'avez généralement rien à faire ici.
  };

  return (
    <>
      <div className="relative">
        <div
          ref={imageContainerRef}
          className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[3/5]"
          onClick={() => setIsFullScreen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={
                    allImages[currentImageIndex]?.optimizedImages?.slider
                      ?.desktop ||
                    allImages[currentImageIndex]?.optimizedImages?.slider
                      ?.mobile ||
                    allImages[currentImageIndex]?.imageUrl
                  }
                  alt={robe.altOptimised || "Image"}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 95vw, 50vw"
                  quality={95}
                  priority
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Link
          href="/robes-de-mariee/forme-princesse"
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-[18px] left-3 z-10 p-2 rounded-full transition-all duration-300 bg-white text-[#af7749] hover:bg-[#af7749] hover:text-white hover:scale-110 animate-breathe`}
        >
          <FaArrowLeft size={20} />
        </Link>

        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavorites(robe);
          }}
          className={`absolute top-[18px] right-3 z-10 p-2 rounded-full transition-all duration-300 bg-white text-[#af7749] hover:bg-[#af7749] hover:text-white hover:scale-110 animate-breathe`}
        >
          <FaRegHeart size={20} />
        </button>

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
              alt={`${robe?.altOptimised}` || "Image"}
              fill
              sizes="80px"
              className="object-cover rounded"
              quality={85}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            <button
              className="absolute z-20 top-4 left-6 rounded-full bg-[#af7749] p-4 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(false);
                setIsZoomed(false); // Réinitialiser l'état zoomé
              }}
            >
              ✕
            </button>

            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToFavorites(robe);
              }}
              className={`absolute top-[18px] right-3 z-40 p-2 rounded-full transition-all duration-300 bg-white text-[#af7749] hover:bg-[#af7749] hover:text-white hover:scale-110 animate-breathe`}
            >
              <FaRegHeart size={20} />
            </button>

            <button
              className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/70 text-[#af7749] rounded-full p-2 hover:bg-[#af7749]/70 hover:text-white transition-colors duration-300 border-2 border-[#af7749] z-40"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              ◀
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              // onClick={toggleZoom}
              ref={imageContainerRef}
              onTouchStart={handleFullScreenTouchStart}
              onTouchMove={handleFullScreenTouchMove}
              onTouchEnd={handleFullScreenTouchEnd}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentImageIndex}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                  style={{
                    transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      ref={fullScreenImageRef}
                      src={
                        allImages[currentImageIndex]?.optimizedImages?.slider
                          ?.desktop ||
                        allImages[currentImageIndex]?.optimizedImages?.slider
                          ?.mobile ||
                        allImages[currentImageIndex]?.imageUrl
                      }
                      alt={robe?.altOptimised || "Image"}
                      fill
                      quality={100}
                      style={{ objectFit: "cover" }}
                      // className={`cursor-${isZoomed ? "move" : "zoom-in"}`} // Curseur "move" si zoomé
                      onLoad={handleImageLoad}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/70 text-[#af7749] rounded-full p-2 hover:bg-[#af7749]/70 hover:text-white transition-colors duration-300 border-2 border-[#af7749] z-40"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              ▶
            </button>
            <MobileActions
              onChatClick={() => alert("Ouverture du chat")}
              onBookingClick={() => alert("Réservation d’un rendez-vous")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
