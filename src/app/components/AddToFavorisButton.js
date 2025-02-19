"use client";

import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

function AddToFavoritesButton({ robe }) {
  const [favorites, setFavorites] = useState([]);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Au montage, récupérer les favoris depuis le localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleAddToFavorites = () => {
    const currentFavorites = Array.isArray(favorites) ? favorites : [];

    // Vérifier si la robe est déjà dans les favoris (éviter les doublons)
    const alreadyExists = currentFavorites.some(
      (fav) => fav.dressName === robe.dressName
    );
    if (alreadyExists) {
      console.log("Cette robe est déjà dans vos favoris !");
      return;
    }

    const newFavorites = [...currentFavorites, robe];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    const favoriteCount = newFavorites.length;

    // Afficher la modal selon le nombre de favoris, si elle n'a pas déjà été affichée
    if (
      (favoriteCount === 1 && !localStorage.getItem("modalShown_1")) ||
      (favoriteCount === 3 && !localStorage.getItem("modalShown_3")) ||
      (favoriteCount === 5 && !localStorage.getItem("modalShown_5"))
    ) {
      let message = "";
      if (favoriteCount === 1) {
        message = "Bravo ! Vous avez ajouté votre premier favori !";
        localStorage.setItem("modalShown_1", "true");
      } else if (favoriteCount === 3) {
        message = "Super ! Vous avez maintenant trois favoris !";
        localStorage.setItem("modalShown_3", "true");
      } else if (favoriteCount === 5) {
        message = "Excellent ! Vous avez cinq favoris !";
        localStorage.setItem("modalShown_5", "true");
      }

      setModalMessage(message);
      setShowCongratulationsModal(true);
    }
  };

  const closeModal = () => {
    setShowCongratulationsModal(false);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToFavorites();
        }}
        className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
      >
        <FaRegHeart size={20} />
      </button>

      {/* Modal en plein écran avec animations */}
      {showCongratulationsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center fadeIn">
          <div className="bg-white w-full h-full flex flex-col items-center justify-center p-5 slideUp">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Félicitations !
            </h3>
            <p className="text-xl text-gray-600 mb-8 text-center">
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-[#af7749] text-white rounded-full hover:bg-[#825c4b] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Ajout des animations globales */}
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        .slideUp {
          animation: slideUp 0.5s ease-in;
        }
      `}</style>
    </>
  );
}

export default AddToFavoritesButton;
