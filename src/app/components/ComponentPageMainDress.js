"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ComponentPageMainDress({ json, id }) {
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [direction, setDirection] = useState(0);
  const mainImageRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch(json);
        const data = await response.json();
        const robeTrouvee = data.find((r) => r.id === parseInt(id));

        if (robeTrouvee) {
          setRobe(robeTrouvee);
          const images = robeTrouvee.images.map((img) => ({
            imageUrl: img.imageUrl,
            optimizedImages: img.optimizedImages,
          }));
          setAllImages(images);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    if (id) {
      chargerRobe();
    }
  }, [id, json]);

  if (!robe) {
    return <div>Chargement...</div>;
  }

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Mouse event handlers
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    if (mainImageRef.current) {
      mainImageRef.current.querySelector(
        "img"
      ).style.transform = `translateX(${deltaX}px)`;
    }
  };

  const handleMouseUp = (event) => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = event.clientX - startX;

    if (deltaX > 50) {
      prevImage();
    } else if (deltaX < -50) {
      nextImage();
    }
    if (mainImageRef.current) {
      mainImageRef.current.querySelector("img").style.transform = "";
    }
  };

  return (
    <>
      {/* Section Image principale */}
      <div
        className="relative w-full h-[400px] overflow-hidden"
        ref={mainImageRef}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImageIndex}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={allImages[currentImageIndex].imageUrl}
              alt={`Image ${currentImageIndex}`}
              layout="fill"
              objectFit="contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Boutons Précédent/Suivant */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          onClick={prevImage}
        >
          ◀
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          onClick={nextImage}
        >
          ▶
        </button>
      </div>

      {/* Miniatures optimisées */}
      <div className="flex gap-2 mt-4">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index);
              setDirection(index > currentImageIndex ? 1 : -1);
            }}
          >
            <Image
              src={img.optimizedImages.thumbnail}
              alt={`Thumbnail ${index}`}
              width={50}
              height={50}
              objectFit="cover"
            />
          </button>
        ))}
      </div>

      {/* Mode plein écran */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-xl"
            onClick={() => setIsFullScreen(false)}
          >
            ✕
          </button>

          {/* Boutons Précédent/Suivant */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
            onClick={prevImage}
          >
            ◀
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
            onClick={nextImage}
          >
            ▶
          </button>

          <Image
            src={allImages[currentImageIndex].imageUrl}
            alt={`Image ${currentImageIndex}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </>
  );
}
