"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/app/components/Header";

export default function ComponentPageMainDress({ json, params }) {
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${json}.json`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const data = await response.json();

        const robeTrouvee = data.find((r) => r.id === parseInt(params.id));
        if (robeTrouvee) {
          const imagesAssociees = data.filter(
            (r) => r.dressName === robeTrouvee.dressName
          );
          setRobe(robeTrouvee);
          setAllImages(imagesAssociees);
        }
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      chargerRobe();
    }
  }, [params.id, json]);

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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setIsZoomed(false);
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
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
              className="object-cover transition-transform duration-500 hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJSEwSjYxMTAuLy0yPVBCUD9LQSY5RVU9T2JUXGSCjZeBKcJRd5qCgrD/2wBDARUXFyAeIB4aHT4qJSo+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>

          {/* Miniatures optimisées */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {allImages.map((img, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 cursor-pointer ${
                  currentImageIndex === index ? "ring-2 ring-[#af7749]" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
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
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={() => {
                setIsFullScreen(false);
                setIsZoomed(false);
              }}
            >
              ✕
            </button>
            <button
              className="absolute left-5 text-white text-4xl"
              onClick={prevImage}
            >
              ◀
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
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
            </div>

            <button
              className="absolute right-5 text-white text-4xl"
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
