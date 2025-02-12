"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import de la balise Image
import Header from "@/app/components/Header";
import { FaWhatsapp, FaHeart } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const ComponentPagePromo = ({ json }) => {
  // On regroupe les robes (par dressName) et on y associe un tableau d'images
  const [dresses, setDresses] = useState([]);
  // sliderIndex correspond à l'index dans le tableau "flat" de toutes les images.
  // S'il est null, le slider est fermé.
  const [sliderIndex, setSliderIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState("");
  // Mode d'affichage mobile de la grille : "column" (1 image par ligne) ou "grid2" (2 images par ligne)
  const [layoutMode, setLayoutMode] = useState("column");

  const router = useRouter();

  // Création d'un tableau plat qui contient pour chaque image ses informations (dressName, price, imageUrl)
  const allImages = useMemo(() => {
    return dresses.flatMap((dress) =>
      dress.images.map((imageUrl) => ({
        dressName: dress.dressName,
        price: dress.price,
        imageUrl,
      }))
    );
  }, [dresses]);

  // Configuration des swipe handlers pour le slider
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Afficher un toast pendant 3 secondes
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // Charger le JSON et grouper par dressName
  const chargerJSON = async () => {
    try {
      const response = await fetch(json);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier JSON");
      }
      const data = await response.json();

      // Grouper les entrées par dressName
      const grouped = data.reduce((acc, robe) => {
        const existing = acc.find((item) => item.dressName === robe.dressName);
        if (existing) {
          if (!existing.images.includes(robe.imageUrl)) {
            existing.images.push(robe.imageUrl);
          }
        } else {
          acc.push({
            ...robe,
            images: [robe.imageUrl],
          });
        }
        return acc;
      }, []);
      setDresses(grouped);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  // Au montage, on charge les données et les favoris
  useEffect(() => {
    chargerJSON();
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Ajout aux favoris (on ajoute ici la robe complète en se basant sur le dressName)
  const handleAddToFavorites = (dress) => {
    const alreadyFav = favorites.some(
      (fav) => fav.dressName === dress.dressName
    );
    if (!alreadyFav) {
      const newFavorites = [
        ...favorites,
        { dressName: dress.dressName, imageUrl: dress.images[0] },
      ];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      showToast("Cette robe a été rajoutée à vos favoris");
    }
  };

  // Lorsque l'utilisateur clique sur une carte de la grille, on ouvre le slider.
  // La carte représente une robe (affichant sa première image). Pour ouvrir le slider
  // à la bonne position dans le tableau flat, on calcule l'index en sommant le nombre d'images
  // des robes précédentes.
  const handleDressClick = (dressIndex) => {
    let flatIndex = 0;
    for (let i = 0; i < dressIndex; i++) {
      flatIndex += dresses[i].images.length;
    }
    setSliderIndex(flatIndex);
  };

  const closeModal = () => {
    setSliderIndex(null);
  };

  // Navigation dans le slider : image suivante
  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (sliderIndex === null || allImages.length === 0) return;
    setSliderIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation dans le slider : image précédente
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (sliderIndex === null || allImages.length === 0) return;
    setSliderIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  // Navigation clavier dans le slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (sliderIndex !== null) {
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
  }, [sliderIndex, allImages]);

  // Pour la grille, ajustement de l'aspect de l'image en fonction du mode mobile
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
        <div
          className={`max-w-screen-2xl mx-auto my-10 px-5 grid gap-4 ${
            layoutMode === "column" ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
        >
          {dresses.map((dress, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => handleDressClick(index)}
            >
              {/* Bouton Favoris */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites(dress);
                }}
                className="absolute top-2 right-2 z-10 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
              >
                <FaHeart size={20} />
              </button>
              {/* Affichage de la première image du groupe */}
              <div className={`relative ${aspectClass} overflow-hidden`}>
                <Image
                  src={dress.images[0]}
                  alt={dress.dressName}
                  layout="fill" // Important pour que l'image remplisse le conteneur
                  objectFit="cover" // Ajuste l'image pour remplir le conteneur
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
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
                    {dress.dressName}
                  </h3>
                  <p className={layoutMode === "grid2" ? "text-xs" : "text-md"}>
                    Prix: {dress.price}
                  </p>
                  <button className="bg-white text-[#af7749] border-none px-3 py-1 rounded-full mt-2 cursor-pointer transition-all duration-300">
                    Voir les détails
                  </button>
                </div>
              </div>
              {/* Infos sous l'image */}
              <div className="p-4 bg-white text-center">
                <h3 className="text-[#af7749] text-[10px] mb-1">
                  {dress.dressName}
                </h3>
                <p className="text-gray-500 text-[10px]">{dress.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Slider */}
      {sliderIndex !== null && allImages.length > 0 && (
        <div
          {...swipeHandlers}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90"
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

          {/* Flèche précédente */}
          <button
            onClick={(e) => prevImage(e)}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            &#10094;
          </button>

          {/* Flèche suivante */}
          <button
            onClick={(e) => nextImage(e)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl"
          >
            &#10095;
          </button>

          {/* Bouton Favoris dans le slider */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // On recherche la robe correspondante (via le dressName) dans le tableau d'origine
              const currentDress = dresses.find(
                (d) => d.dressName === allImages[sliderIndex].dressName
              );
              if (currentDress) {
                handleAddToFavorites(currentDress);
              }
            }}
            className="absolute top-5 right-16 z-50 bg-white text-[#af7749] p-2 rounded-full hover:bg-[#af7749] hover:text-white transition-colors"
          >
            <FaHeart size={20} />
          </button>

          {/* Zone d'affichage de l'image et de sa légende */}
          <div className="max-h-[80vh] max-w-[90vw] flex flex-col items-center">
            <Image
              src={allImages[sliderIndex].imageUrl}
              alt={allImages[sliderIndex].dressName}
              width={800} // Ajustez ces valeurs en fonction de la taille souhaitée
              height={1200} // Ajustez ces valeurs en fonction de la taille souhaitée
              className="object-contain max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center text-white">
              <h2 className="text-2xl font-bold">
                {allImages[sliderIndex].dressName}
              </h2>
              <p className="text-xl">Prix: {allImages[sliderIndex].price}</p>
            </div>
          </div>

          {/* Bouton WhatsApp */}
          <a
            href={`https://wa.me/33668300960?text=${encodeURIComponent(
              `Bonjour, je suis intéressé(e) par la robe : ${allImages[sliderIndex].dressName}`
            )}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 flex items-center justify-center bg-[#825c4b] text-white rounded-full w-20 h-20 shadow-lg hover:bg-[#b98050] transition-all duration-300"
          >
            <FaWhatsapp size={40} />
          </a>
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
