"use client";

import { useState, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [robes, setRobes] = useState([]);
  const router = useRouter();
  const galleryRef = useRef(null);
  const menuItemRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fonction pour charger les robes depuis le fichier JSON
  const chargerJSON = async () => {
    try {
      const response = await fetch("/robe-de-mariee.json");
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

  const handleDressClick = (id) => {
    router.push(`/${id}`);
  };

  const startCloseTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setIsGalleryOpen(false);
    }, 100); // 3 seconds
  };

  const clearCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Gestion du clic en dehors de la galerie
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        galleryRef.current &&
        !galleryRef.current.contains(event.target) &&
        menuItemRef.current &&
        !menuItemRef.current.contains(event.target)
      ) {
        setIsGalleryOpen(false);
        clearCloseTimer(); // Clear any pending timeouts
      }
    }

    // Lie l'écouteur d'événement au document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Nettoie l'écouteur d'événement
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [galleryRef, menuItemRef]);

  return (
    <header>
      {/* Navigation Desktop */}
      <nav className="hidden md:flex fixed top-0 w-full z-30 bg-[#FDE9E6] items-center justify-between px-8 h-20">
        {/* Menu de gauche */}
        <ul className="flex space-x-5">
          <li>
            <a
              href="/"
              className="text-[#af7749] hover:text-[#F5D2B5] flex items-center gap-1"
            >
              <IoHomeOutline className="text-lg" />
              Accueil
            </a>
          </li>

          <li
            className="relative"
            onMouseEnter={() => {
              setIsGalleryOpen(true);
              clearCloseTimer();
            }}
            onMouseLeave={() => {
              startCloseTimer();
            }}
            ref={menuItemRef}
          >
            <a
              href="#"
              className="text-[#af7749] hover:text-[#F5D2B5] cursor-pointer"
            >
              Robes de Mariée
            </a>
            {/* Galerie de robes */}
            {isGalleryOpen && (
              <div
                ref={galleryRef}
                className="fixed left-0 mt-2 py-2 w-1/2 bg-[#fde9e6] shadow-xl rounded-md overflow-hidden z-10"
              >
                {/* Version améliorée de la galerie */}
                <div className="max-w-screen-2xl mx-auto my-10 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {robes.map((robe, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-lg shadow-sm bg-white cursor-pointer"
                      onClick={() => handleDressClick(robe.link)}
                    >
                      {/* Image de la robe */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img
                          src={robe.imageUrl}
                          alt={robe.dressName}
                          className="w-full h-full object-cover transition-all duration-500"
                        />
                        {/* Overlay au survol */}
                        <div className="absolute inset-0 bg-[#af7749] bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                          <h3 className="text-white text-xl mb-4">
                            {robe.dressName}
                          </h3>
                          <button className="bg-white text-[#af7749] px-6 py-2 rounded-full text-sm hover:bg-[#F5D2B5] transition-colors">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                      {/* Texte en dessous */}
                      <div className="text-center py-3">
                        <h3 className="text-[#af7749] text-sm">
                          {robe.dressName}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li>
            <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
              Promotion
            </a>
          </li>
          <li>
            <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
              Nos créateurs
            </a>
          </li>
        </ul>

        {/* Logo au centre */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#af7749] font-[Playfair]">
            Monica <span className="text-base text-gray-600">Mariage</span>
          </h1>
        </div>

        {/* Menu de droite */}
        <div className="flex items-center space-x-5">
          <Link href="/contact" className="text-[#af7749] hover:text-[#F5D2B5]">
            Prendre Rendez-vous
          </Link>
          <Link
            href="/nous-trouver"
            className="text-[#af7749] hover:text-[#F5D2B5]"
          >
            Trouver le showroom
          </Link>
          <button className="p-2">
            <svg
              className="w-6 h-6 text-[#af7749] hover:text-[#F5D2B5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M15 11a4 4 0 10-8 0 4 4 0 008 0z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Navigation Mobile */}
      <nav className="flex md:hidden fixed top-0 w-full z-40 bg-white shadow-md px-4 py-2 justify-between items-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-[#af7749] font-[Playfair]">
            Monica <span className="text-sm text-gray-600">Mariage</span>
          </h1>
        </div>
        {/* Bouton menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-[#925c36]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-[#FDE9E6] shadow-lg p-4 z-50">
          <ul className="flex flex-col space-y-4 text-center">
            <li>
              <a
                href="/gallery"
                className="text-[#af7749] hover:text-[#F5D2B5]"
              >
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
            <li>
              <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
                Prendre Rendez-vous
              </a>
            </li>
            <li>
              <a href="#" className="text-[#af7749] hover:text-[#F5D2B5]">
                Trouver le showroom
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
