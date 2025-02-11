"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [robes, setRobes] = useState([]);
  const router = useRouter();
  // Fonction pour charger les robes depuis le fichier JSON
  const chargerJSON = async () => {
    try {
      const response = await fetch("/style-boheme-chic.json");
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

  // Redirection vers la page de détails de la robe
  const handleDressClick = (id) => {
    router.push(`/style-boheme-chic/dress/${id}`);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 w-full z-30">
        <nav className="flex justify-between items-center bg-[#FDE9E6] px-8 h-20">
          {/* Menu de gauche */}
          <ul className="flex space-x-5">
            <li>
              <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
                Robes de Mariée
              </a>
            </li>
            <li>
              <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
                Tenues de Soirée
              </a>
            </li>
            <li>
              <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
                Robes de Cortège
              </a>
            </li>
          </ul>

          {/* Logo au centre */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-[#af7749]">Monica</span>
              <span className="text-gray-600">Mariage</span>
            </h1>
          </div>

          {/* Menu de droite */}
          <div className="flex items-center space-x-5">
            <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
              Prendre Rendez-vous
            </a>
            <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
              Trouver le showroom
            </a>
            <button className="p-2">
              <svg
                className="w-6 h-6 text-[#af7749] hover:text-[#F5D2B5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-4.35-4.35M15 11a4 4 0 10-8 0 4 4 0 008 0z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

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
              onClick={() => handleDressClick(robe.id)}
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
                  <button className="bg-white text-[#af7749] border-none px-5 py-2 rounded-full mt-4 cursor-pointer transition-all duration-300">
                    Voir les détails
                  </button>
                </div>
              </div>
              {/* Infos sous l'image */}
              <div className="p-4 bg-white text-center">
                <h3 className="text-[#af7749] mb-1">{robe.dressName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
