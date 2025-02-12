"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/app/components/Header";

export default function ComponentPageMainDress(json) {
  const { id } = useParams();
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); // Gestion du zoom au clic

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch(`${json}.json`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const data = await response.json();

        const robeTrouvee = data.find((r) => r.id === parseInt(id));
        if (robeTrouvee) {
          const imagesAssociees = data.filter(
            (r) => r.dressName === robeTrouvee.dressName
          );
          setRobe(robeTrouvee);
          setAllImages(imagesAssociees);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    if (id) {
      chargerRobe();
    }
  }, [id]);

  if (!robe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Chargement...
      </div>
    );
  }

  // Changer d’image avec apparition fluide
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
      {/* Header */}
      <Header />

      {/* Contenu de la page de détail */}
      <div className="max-w-7xl mx-auto mt-[150px] px-6 flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => setIsFullScreen(true)}
          >
            {/* Image avec effet zoom au premier affichage */}
            <motion.img
              key={allImages[currentImageIndex]?.imageUrl}
              src={allImages[currentImageIndex]?.imageUrl}
              alt={robe.dressName}
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Infos */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-[#af7749] mb-4">
            {robe.dressName}
          </h1>
          <p className="text-gray-700 leading-relaxed">{robe.description}</p>

          {/* Sélection Taille */}
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

          {/* CTA */}
          <a
            href="#"
            className="mt-6 block w-full text-center bg-[#af7749] text-white py-3 rounded-lg font-medium hover:bg-[#925c36] transition-all duration-300"
          >
            PRENDRE RENDEZ-VOUS
          </a>
        </div>
      </div>

      {/* Mode plein écran */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsFullScreen(false)}
          >
            ✕
          </button>
          <button
            className="absolute left-5 text-white text-4xl"
            onClick={prevImage}
          >
            ◀
          </button>
          <AnimatePresence mode="wait">
            <motion.img
              key={allImages[currentImageIndex]?.imageUrl}
              src={allImages[currentImageIndex]?.imageUrl}
              alt={robe.dressName}
              className="max-w-full max-h-[90vh] object-contain cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 1.5 : 1, // Effet de zoom au clic
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsZoomed(!isZoomed)} // Toggle zoom au clic
            />
          </AnimatePresence>
          <button
            className="absolute right-5 text-white text-4xl"
            onClick={nextImage}
          >
            ▶
          </button>
        </div>
      )}
    </>
  );
}
