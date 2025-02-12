"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

const ComponentPagePromo = ({ json }) => {
  const [robes, setRobes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const router = useRouter();

  // Fonction pour charger les robes depuis le fichier JSON
  const chargerJSON = async () => {
    try {
      const response = await fetch(json);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier JSON");
      }
      const data = await response.json();

      // Filtrer pour ne garder qu'une entrée par nom
      const robesUniques = [];
      const nomsDejaVus = new Set();

      data.forEach((robe) => {
        if (!nomsDejaVus.has(robe.dressName)) {
          nomsDejaVus.add(robe.dressName);
          robesUniques.push(robe);
        }
      });

      setRobes(robesUniques);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  useEffect(() => {
    chargerJSON();
  }, []);

  // Ouvrir le slider en cliquant sur une robe
  const handleDressClick = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex === robes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? robes.length - 1 : prevIndex - 1
    );
  };

  // Navigation au clavier dans le slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "ArrowLeft") {
          prevImage();
        } else if (e.key === "Escape") {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, robes.length]);

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* Contenu de la galerie */}
      <div className="pt-20 bg-white">
        {/* Hero Section */}
        <div className="text-center py-16 px-5 bg-gradient-to-b from-[#FDE9E6] to-white">
          <h1 className="text-[42px] text-[#af7749] font-playfair mb-5">
            Nos Collections
          </h1>
          <p className="text-[18px] text-gray-500 font-poppins">
            Découvrez l'élégance de nos robes de mariée
          </p>
        </div>

        {/* Section Filtres */}
        <div className="py-7 bg-white border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto flex justify-center gap-5 flex-wrap">
            <button className="px-5 py-2 border border-[#af7749] bg-transparent text-[#af7749] rounded-full font-poppins cursor-pointer transition-all duration-300 active:bg-[#af7749] active:text-white hover:bg-[#af7749] hover:text-white">
              Toutes les robes
            </button>
            <button className="px-5 py-2 border border-[#af7749] bg-transparent text-[#af7749] rounded-full font-poppins cursor-pointer transition-all duration-300 hover:bg-[#af7749] hover:text-white">
              Sirène
            </button>
            <button className="px-5 py-2 border border-[#af7749] bg-transparent text-[#af7749] rounded-full font-poppins cursor-pointer transition-all duration-300 hover:bg-[#af7749] hover:text-white">
              Princesse
            </button>
            <button className="px-5 py-2 border border-[#af7749] bg-transparent text-[#af7749] rounded-full font-poppins cursor-pointer transition-all duration-300 hover:bg-[#af7749] hover:text-white">
              Bohème
            </button>
            <button className="px-5 py-2 border border-[#af7749] bg-transparent text-[#af7749] rounded-full font-poppins cursor-pointer transition-all duration-300 hover:bg-[#af7749] hover:text-white">
              Collection 2024
            </button>
          </div>
        </div>

        {/* Grille de la Galerie */}
        <div className="max-w-screen-2xl mx-auto my-10 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {robes.map((robe, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleDressClick(index)}
            >
              {/* Image de la robe */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={robe.imageUrl}
                  alt={robe.dressName}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              {/* Overlay au survol */}
              <div className="absolute top-0 left-0 w-full h-full bg-[#af7749] bg-opacity-90 opacity-0 transition-opacity duration-300 flex items-center justify-center text-center group-hover:opacity-100">
                <div className="text-white p-5">
                  <h3 className="text-lg font-bold mb-2">{robe.dressName}</h3>
                  <p className="text-md">Prix: {robe.price}</p>{" "}
                  {/* Ajout du prix ici */}
                  <button className="bg-white text-[#af7749] border-none px-5 py-2 rounded-full mt-4 cursor-pointer transition-all duration-300">
                    Voir les détails
                  </button>
                </div>
              </div>
              {/* Infos sous l'image */}
              <div className="p-4 bg-white text-center">
                <h3 className="text-[#af7749] mb-1">{robe.dressName}</h3>
                <p className="text-gray-500">{robe.price}</p>{" "}
                {/* Ajout du prix ici */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Slider */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeModal}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            &times;
          </button>
          {/* Flèche Précédente */}
          <button
            onClick={(e) => prevImage(e)}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            &#10094;
          </button>
          {/* Image zoomée */}
          <img
            src={robes[selectedIndex].imageUrl}
            alt={robes[selectedIndex].dressName}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Flèche Suivante */}
          <button
            onClick={(e) => nextImage(e)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
};

export default ComponentPagePromo;
