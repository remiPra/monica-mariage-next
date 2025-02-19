// AddToFavoritesButton.jsx
"use client";

import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";

function AddToFavoritesButton({ robe, favorites, setFavorites }) {
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleAddToFavorites = (robe) => {
    const newFavorites = [...favorites, robe];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    const favoriteCount = newFavorites.length;

    // Check if the modal should be shown
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
          handleAddToFavorites(robe);
        }}
        className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
      >
        <FaRegHeart size={20} />
      </button>

      {/* Congratulations Modal */}
      {showCongratulationsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Félicitations !
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{modalMessage}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#af7749] text-white rounded-md hover:bg-[#825c4b] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddToFavoritesButton;
