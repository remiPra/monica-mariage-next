"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/app/components/Header";

export default function ComponentPageMainDress({ json, id }) {
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0); // Track swipe direction

  const constraintsRef = useRef(null);

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(json);
        const data = await response.json();
        const robeTrouvee = data.find((r) => r.id === parseInt(id));

        if (robeTrouvee) {
          setRobe(robeTrouvee);
          // Important: Use optimized images if available, fallback to original
          const images = robeTrouvee.images.map((img) => ({
            imageUrl: img.imageUrl,
            optimizedImages: img.optimizedImages, // Keep optimized images
          }));
          setAllImages(images);
          setIsLoading(false); // Set loading to false *after* data is fetched
        }
      } catch (error) {
        console.error("Erreur :", error);
        setIsLoading(false); // Also set to false on error
      }
    };

    if (id) {
      chargerRobe();
    }
  }, [id, json]);

  if (isLoading || !robe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-48 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setIsZoomed(false);
    setDirection(1); // Set direction to right
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setIsZoomed(false);
    setDirection(-1); // Set direction to left
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  const handleSwipe = (event, info) => {
    // Use info.offset.x to determine swipe direction and distance
    if (info.offset.x > 50) {
      // Adjust threshold as needed
      prevImage();
    } else if (info.offset.x < -50) {
      // Adjust threshold as needed
      nextImage();
    }
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto mt-[150px] px-6 flex flex-col lg:flex-row gap-10">
        {/* Section Image principale */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[2/3]"
            onClick={() => setIsFullScreen(true)}
            ref={constraintsRef}
          >
            {/* Use AnimatePresence for exit/enter animations */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentImageIndex}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                className="absolute inset-0"
                drag="x"
                dragConstraints={constraintsRef}
                onDragEnd={handleSwipe}
              >
                <Image
                  src={
                    allImages[currentImageIndex]?.optimizedImages?.slider
                      ?.desktop || allImages[currentImageIndex]?.imageUrl
                  }
                  alt={robe.dressName}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  priority
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJSEwSjYxMTAuLy0yPVBCUD9LQSY5RVU9T2JUXGSCjZeBKcJRd5qCgrD/2wBDARUXFyAeIB4aHT4qJSo+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Miniatures optimisées */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {allImages.map((img, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 cursor-pointer ${
                  currentImageIndex === index ? "ring-2 ring-[#af7749]" : ""
                }`}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setDirection(index > currentImageIndex ? 1 : -1);
                }}
              >
                <Image
                  src={img.optimizedImages?.gallery?.thumbnail || img.imageUrl}
                  alt={`${robe.dressName} - vue ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover rounded"
                  quality={60}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section Infos */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-[#af7749] mb-4">
            {robe.dressName}
          </h1>
          <p className="text-gray-700 leading-relaxed">{robe.description}</p>

          <div className="mt-6">
            <label
              htmlFor="size"
              className="block text-sm font-semibold text-gray-700"
            >
              TAILLE
            </label>
            <select
              id="size"
              className="mt-2 block w-full border rounded-lg px-3 py-2"
            >
              <option value="">Choisir une option</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>

          <a
            href="#"
            className="mt-6 block w-full text-center bg-[#af7749] text-white py-3 rounded-lg font-medium hover:bg-[#925c36] transition-all duration-300"
          >
            PRENDRE RENDEZ-VOUS
          </a>
        </div>
      </div>

      {/* Mode plein écran avec images optimisées et swipe */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            ref={constraintsRef}
          >
            <button
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={() => {
                setIsFullScreen(false);
                setIsZoomed(false);
              }}
            >
              ✕
            </button>

            {/* Previous/Next buttons (optional, but good for accessibility) */}
            <button
              className="absolute left-5 text-white text-4xl"
              onClick={prevImage}
            >
              ◀
            </button>
            <button
              className="absolute right-5 text-white text-4xl"
              onClick={nextImage}
            >
              ▶
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* AnimatePresence for fullscreen image */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={constraintsRef}
                  onDragEnd={handleSwipe}
                >
                  <Image
                    src={
                      allImages[currentImageIndex]?.optimizedImages?.slider
                        ?.desktop || allImages[currentImageIndex]?.imageUrl
                    }
                    alt={robe.dressName}
                    fill
                    quality={100}
                    className={`object-contain transition-transform duration-300 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
