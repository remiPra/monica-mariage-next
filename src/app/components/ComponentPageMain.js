"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Header";
import { FaRegHeart } from "react-icons/fa";
import AddToFavoritesButton from "./AddToFavorisButton";

const ComponentMainPage = ({ json }) => {
  const [robes, setRobes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layoutMode, setLayoutMode] = useState("grid1"); // 'grid1' ou 'grid2'
  const router = useRouter();

  const chargerJSON = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${json}.json`);
      if (!response.ok) throw new Error("Erreur de chargement JSON");
      const data = await response.json();

      const robesUniques = data.reduce((acc, robe) => {
        if (!acc.some((r) => r.dressName === robe.dressName)) {
          acc.push(robe);
        }
        return acc;
      }, []);

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

  const handleDressClick = (id) => {
    router.push(`/robes-de-mariee${json}/dress/${id}`);
  };

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

      {/* Contrôles de layout mobile */}
      <div className="fixed top-[92px] left-0 right-0 z-20 bg-white shadow py-2 sm:hidden flex justify-center gap-2">
        <button
          onClick={() => setLayoutMode("grid1")}
          className={`px-3 py-1 rounded border transition-colors ${
            layoutMode === "grid1"
              ? "bg-[#af7749] text-white"
              : "bg-white text-[#af7749]"
          }`}
        >
          1 Image
        </button>
        <button
          onClick={() => setLayoutMode("grid2")}
          className={`px-3 py-1 rounded border transition-colors ${
            layoutMode === "grid2"
              ? "bg-[#af7749] text-white"
              : "bg-white text-[#af7749]"
          }`}
        >
          2 Images
        </button>
      </div>

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
        <div
          className={`max-w-screen-2xl mx-auto my-10 px-5 grid gap-4 ${
            layoutMode === "grid1" ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
        >
          {isLoading
            ? [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
            : robes.map((robe, index) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDressClick(robe.id);
                  }}
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
                >
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleAddToFavorites(robe);
                    }}
                    className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
                  >
                    <FaRegHeart size={20} />
                  </button> */}
                  <AddToFavoritesButton robe={robe} />
                  {/* Conteneur d'image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={robe.imageUrl}
                      alt={robe.dressName}
                      fill
                      sizes={`${
                        layoutMode === "grid2"
                          ? "(max-width: 640px) 50vw, 33vw"
                          : "(max-width: 640px) 100vw, 33vw"
                      }`}
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      priority={index < 4}
                      loading={index < 4 ? "eager" : "lazy"}
                      quality={layoutMode === "grid2" ? 75 : 90}
                    />
                  </div>

                  {/* Infos sous l'image */}
                  <div className="p-4 bg-white text-center space-y-2">
                    <h3 className="text-[#af7749] font-medium text-sm">
                      {robe.dressName}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDressClick(robe.id);
                      }}
                      className="bg-[#af7749] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#825c4b] transition-colors"
                    >
                      Découvrir plus
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default ComponentMainPage;
