"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import de la balise Image
import Header from "../components/Header";

const Page = () => {
  const [robes, setRobes] = useState([]);
  const router = useRouter();

  // Fonction pour charger les robes depuis le fichier JSON
  const chargerJSON = async () => {
    try {
      const response = await fetch("/promo.json");
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
    router.push(`/promo/${id}`);
  };

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* Contenu de la galerie */}
      <div className="pt-20 bg-white">
        {/* Hero Section */}
        <div className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FDE9E6] to-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-cursive sm:text-4xl lg:text-5xl text-[#af7749] font-playfair mb-6 leading-tight">
              Promotions robes de mariée de la boutique Monica mariage
            </h1>
            <Image
              src="/image/iconerobe.png"
              alt="Robes de mariée icon"
              width={96} // Définir la largeur
              height={96} // Définir la hauteur
              className="mx-auto mb-2"
            />
            <p className="text-base sm:text-lg text-gray-600 font-poppins max-w-4xl mx-auto leading-relaxed mb-8">
              Découvrez notre sélection exclusive et sublimez votre jour J Robes
              de mariée taille 36-42 à prix imbattables!
            </p>

            {/* Nouveau bouton de défilement */}
            <button
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#af7749] text-white rounded-full hover:bg-[#8b5e3a] transition-colors duration-300"
            >
              Acceder au menu
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grille de la Galerie */}
        <div className="max-w-screen-2xl mx-auto my-10 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {robes.map((robe, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleDressClick(robe.link)}
            >
              {/* Image de la robe */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={robe.imageUrl}
                  alt={robe.dressName}
                  layout="fill" // Important pour que l'image remplisse le conteneur
                  objectFit="cover" // Ajuste l'image pour remplir le conteneur
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
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
