"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { FaWhatsapp, FaHeart } from "react-icons/fa";

const ComponentPagePromo = ({ json }) => {
  const [robes, setRobes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState("");
  // Mode d'affichage mobile : "column" pour une image par ligne, "grid2" pour 2 images par ligne
  const [layoutMode, setLayoutMode] = useState("column");

  const router = useRouter();

  // Afficher un toast pendant 3 secondes
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // Charger le JSON des robes
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

  // Charger les favoris depuis localStorage et le JSON au montage
  useEffect(() => {
    chargerJSON();

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Ajout aux favoris avec toast
  const handleAddToFavorites = (robe) => {
    const alreadyFav = favorites.some(
      (fav) => fav.dressName === robe.dressName
    );
    if (!alreadyFav) {
      const newFavorites = [
        ...favorites,
        { dressName: robe.dressName, imageUrl: robe.imageUrl },
      ];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      showToast("Cette robe a été rajoutée à vos favoris");
    }
  };

  // Gestion du slider
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

  // Navigation clavier dans le slider
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

  // Choix de l'aspect de l'image en fonction du mode mobile
  // En mode "grid2", on souhaite des images plus longues (ratio plus "tall")
  const aspectClass = layoutMode === "grid2" ? "aspect-[1/2]" : "aspect-[3/4]";

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* Barre de contrôle fixe sous le menu (visible uniquement sur mobile) */}
      <div className="fixed top-[80px] left-0 right-0 z-40 bg-white shadow py-2 sm:hidden flex justify-center gap-2">
        <button
          onClick={() => setLayoutMode("column")}
          className={`px-3 py-1 rounded border transition-colors ${
            layoutMode === "column"
              ? "bg-[#af7749] text-white"
              : "bg-white text-[#af7749]"
          }`}
        >
          Image Simple
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

      {/* Contenu de la page */}
      {/* On ajoute un padding-top suffisant pour ne pas être recouvert par le Header et la barre fixe */}
      <div className="pt-32 bg-white">
        {/* Hero Section */}
        <div className="text-center py-16 px-5 bg-gradient-to-b from-[#FDE9E6] to-white">
          <h1 className="text-3xl md:text-[42px] text-[#af7749] font-playfair mb-5">
            Nos Collections
          </h1>
          <p className="text-sm md:text-[18px] text-gray-500 font-poppins">
            Découvrez l'élégance de nos robes de mariée
          </p>
        </div>

        {/* Grille de la Galerie */}
        {/* Le gap a été réduit et sur mobile, le nombre de colonnes dépend du mode choisi */}
        <div
          className={`max-w-screen-2xl mx-auto my-10 px-5 grid gap-4 ${
            layoutMode === "column" ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
        >
          {robes.map((robe, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleDressClick(index)}
            >
              {/* Bouton Favoris */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(robe);
                }}
                className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
              >
                <FaHeart size={20} />
              </button>

              {/* Image de la robe */}
              <div className={`relative ${aspectClass} overflow-hidden`}>
                <img
                  src={robe.imageUrl}
                  alt={robe.dressName}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Overlay au survol */}
              <div className="absolute top-0 left-0 w-full h-full bg-[#af7749] bg-opacity-90 opacity-0 transition-opacity duration-300 flex items-center justify-center text-center group-hover:opacity-100">
                <div
                  className={`p-2 text-white ${
                    layoutMode === "grid2" ? "text-sm" : "text-base"
                  }`}
                >
                  <h3
                    className={`font-bold mb-2 ${
                      layoutMode === "grid2" ? "text-base" : "text-lg"
                    }`}
                  >
                    {robe.dressName}
                  </h3>
                  <p className={layoutMode === "grid2" ? "text-xs" : "text-md"}>
                    Prix: {robe.price}
                  </p>
                  <button className="bg-white text-[#af7749] border-none px-3 py-1 rounded-full mt-2 cursor-pointer transition-all duration-300">
                    Voir les détails
                  </button>
                </div>
              </div>

              {/* Infos sous l'image */}
              <div className="p-4 bg-white text-center">
                <h3 className="text-[#af7749] mb-1">{robe.dressName}</h3>
                <p className="text-gray-500">{robe.price}</p>
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

          {/* Bouton Favoris dans le slider */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToFavorites(robes[selectedIndex]);
            }}
            className="absolute top-5 right-16 z-50 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
          >
            <FaHeart size={20} />
          </button>

          {/* Image zoomée */}
          <img
            src={robes[selectedIndex].imageUrl}
            alt={robes[selectedIndex].dressName}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Bouton WhatsApp */}
          <a
            href={`https://wa.me/33668300960?text=${encodeURIComponent(
              `Bonjour, je suis intéressé(e) par la robe : ${robes[selectedIndex]?.dressName}`
            )}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 flex items-center justify-center bg-[#825c4b] text-white rounded-full w-20 h-20 shadow-lg hover:bg-[#b98050] transition-all duration-300"
          >
            <FaWhatsapp size={40} />
          </a>

          {/* Flèche Suivante */}
          <button
            onClick={(e) => nextImage(e)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            &#10095;
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#af7749] text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}
    </>
  );
};

export default ComponentPagePromo;
