"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";

export default function PageFavoris() {
  const [favorites, setFavorites] = useState([]);

  // 1) Charger depuis le localStorage au montage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 2) Fonction de suppression
  const handleRemoveFavorite = (index) => {
    // Copier le tableau actuel
    const newFavorites = [...favorites];
    // Retirer l'élément à l'index donné
    newFavorites.splice(index, 1);
    // Mettre à jour le state
    setFavorites(newFavorites);
    // Écrire dans le localStorage
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Barre du haut */}
      {/* <div className="py-5 px-4 flex justify-between items-center bg-[#FDE9E6]">
        <h1 className="text-2xl text-[#af7749]">Mes Favoris</h1>
        <Link href="/" className="text-[#af7749] underline">
          Retour Accueil
        </Link>
      </div> */}
      <Header />
      {/* Contenu */}
      <div className="max-w-screen-xl mt-[100px] mx-auto py-10 px-5">
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun favori pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((fav, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={fav.imageUrl}
                    alt={fav.dressName}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>

                {/* Overlay (survol) */}
                <div className="absolute top-0 left-0 w-full h-full bg-[#af7749] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-white text-xl mb-4">{fav.dressName}</h3>
                  {/* Bouton de suppression */}
                  <button
                    onClick={() => handleRemoveFavorite(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
