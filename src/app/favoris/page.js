"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaWhatsapp } from "react-icons/fa";
import FloatingButtonMainPage from "../components/FloatingButtonMainPage";

export default function PageFavoris() {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis le localStorage au montage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    console.log(storedFavorites);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Fonction de suppression d'un favori
  const handleRemoveFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Préparer le message WhatsApp en filtrant les éléments valides
  const message =
    "Bonjour, je suis intéressé(e) par les robes: " +
    favorites
      .filter((fav) => fav && fav.dressName)
      .map((fav) => fav.dressName)
      .join(", ");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Contenu principal */}
      <div className="max-w-screen-xl mt-[100px] mx-auto py-10 px-5">
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun favori pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((fav, index) => {
              // Si l'élément est invalide, ne rien afficher
              if (!fav || !fav.imageUrl || !fav.dressName) return null;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md"
                >
                  {/* Image de la robe */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={fav.imageUrl}
                      alt={fav.dressName}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  {/* Overlay sur le survol */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[#af7749] bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="text-white text-xl mb-4">{fav.dressName}</h3>
                    <button
                      onClick={() => handleRemoveFavorite(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* <FloatingButtonMainPage /> */}

      {/* Bouton WhatsApp pour partager les favoris */}
      {favorites.length > 0 && (
        <a
          href={`https://wa.me/33668300960?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 right-4 flex items-center justify-center bg-[#825c4b] text-white rounded-full w-20 h-20 shadow-lg hover:bg-[#b98050] transition-all duration-300"
        >
          <FaWhatsapp size={40} />
        </a>
      )}
    </div>
  );
}
