"use client";

import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/app/components/Header";

export default function DressDetailPage() {
  const { id } = useParams();

  // Déclaration des états et références
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [safeDescription, setSafeDescription] = useState(''); // Ajout de l'état pour la description sanitizée
  const imageContainerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch("/forme-princesse.json");
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
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setIsLoading(false);
      }
    };

    if (id) {
      chargerRobe();
    }
  }, [id]);

  // Sanitize la description après le chargement de la robe
  useEffect(() => {
    if (robe) {
      setSafeDescription(DOMPurify.sanitize(robe.description_html));
    }
  }, [robe]);

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

  return (
    <>
      <Header />

      <div className="mt-[100px] md:mt-[150px] max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* Section Image */}
        <div className="w-full lg:w-1/2">
          <div
            ref={imageContainerRef}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[3/5]" // Ajustement de l'aspect ratio pour une image plus haute
            onClick={() => setIsFullScreen(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image principale */}
            <Image
              src={
                allImages[currentImageIndex]?.optimizedImages?.slider
                  ?.desktop ||
                allImages[currentImageIndex]?.optimizedImages?.slider?.mobile ||
                allImages[currentImageIndex]?.imageUrl
              }
              alt={robe.dressName}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 95vw, 50vw"
              quality={95}
              priority
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Miniatures */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {allImages.map((img, index) => (
              <div
                key={index}
                className={`relative min-w-[80px] w-[80px] h-[120px] cursor-pointer ${ // Réduction de la taille des miniatures
                  currentImageIndex === index ? "ring-2 ring-[#af7749]" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={img.optimizedImages?.gallery?.mobile || img.imageUrl}
                  alt={`${robe.dressName} - vue ${index + 1}`}
                  fill
                  sizes="80px" // Taille des miniatures
                  className="object-cover rounded"
                  quality={85}
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
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: safeDescription }} // Utilisation de la description sanitizée
          />

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
              className="absolute z-20 top-5 right-5 text-white text-3xl"
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
                    ?.desktop ||
                  allImages[currentImageIndex]?.optimizedImages?.slider
                    ?.mobile ||
                  allImages[currentImageIndex]?.imageUrl
                }
                alt={robe.dressName}
                fill
                quality={100}
                className={`object-contain transition-transform duration-300 p-4 ${
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