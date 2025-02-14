"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Header";
import { FaRegHeart } from "react-icons/fa";

const ComponentMainPage = ({ json }) => {
  const [robes, setRobes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const chargerJSON = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${json}.json`);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chargerJSON();
  }, [json]);

  // Redirection vers la page de détails de la robe
  const handleDressClick = (id) => {
    router.push(`/robes-de-mariee${json}/dress/${id}`);
    // console.log(`/robes-de-mariee${json}/dress/${id}`);
  };

  // Composant pour le skeleton loading
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="relative aspect-[2/3] bg-gray-200 rounded-lg"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
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

        {/* Grille de la Galerie */}
        <div className="max-w-screen-2xl mx-auto my-10 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isLoading
            ? // Afficher les skeletons pendant le chargement
              [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
            : robes.map((robe, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleDressClick(robe.id)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFavorites(robe); // Utilisation de la robe actuelle
                    }}
                    className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
                  >
                    <FaRegHeart size={20} />
                  </button>
                  {/* Image de la robe */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={
                        robe.optimizedImages?.gallery?.desktop ||
                        robe.optimizedImages?.gallery?.tablet ||
                        robe.optimizedImages?.gallery?.mobile ||
                        robe.imageUrl
                      }
                      alt={robe.dressName}
                      fill
                      sizes="(max-width: 640px) 100vw, 
         (max-width: 768px) 50vw,
         (max-width: 1024px) 33vw,
         25vw"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      priority={index < 4}
                      loading={index < 4 ? "eager" : "lazy"}
                      quality={90}
                    />
                  </div>
                  {/* Overlay au survol */}
                  <div className="hidden md:flex absolute top-0 left-0 w-full h-full bg-[#af7749] bg-opacity-90 opacity-0 transition-opacity duration-300  items-center justify-center text-center group-hover:opacity-100">
                    <div className="text-white p-5">
                      <h3 className="text-lg font-bold mb-2">
                        {robe.dressName}
                      </h3>
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

export default ComponentMainPage;
