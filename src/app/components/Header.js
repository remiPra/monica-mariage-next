"use client";

import { useState, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5"; // Importez l'icône de fermeture
import { TiPhoneOutline } from "react-icons/ti";

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

  const drawerVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    closed: {
      y: "-100vh",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <header className="fixed top-0 w-full z-30">
      {/* Contact bar (Mobile only) */}
      <div className="bg-[#A37B63] text-white text-sm py-2 px-4 flex justify-center md:hidden">
        <div className="flex items-center gap-2">
          <FaWhatsapp className="text-lg" />
          <a href="tel:+33668300960" className="hover:underline">
            06 68 30 09 60
          </a>
          <TiPhoneOutline className="text-lg" />
        </div>
      </div>

      {/* Navigation Desktop */}
      <nav className="hidden md:flex bg-[#FDE9E6] items-center justify-between px-8 h-20">
        {/* Menu de gauche */}
        <ul className="flex space-x-5">
          <li>
            <a
              href="/"
              className="text-[#7A5C4B] hover:text-[#A37B63] flex items-center gap-1"
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
            <Link
              href="/robes-de-mariee"
              className="text-[#7A5C4B] hover:text-[#A37B63] cursor-pointer"
            >
              Robes de Mariée
            </Link>
            {/* Galerie de robes */}
            {isGalleryOpen && (
              <div
                ref={galleryRef}
                className="fixed left-0 mt-2 py-2 w-1/2 bg-[#F5E7DE] shadow-xl rounded-md overflow-hidden z-10"
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
                        <div className="absolute inset-0 bg-[#7A5C4B] bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                          <h3 className="text-white text-xl mb-4">
                            {robe.dressName}
                          </h3>
                          <button className="bg-white text-[#7A5C4B] px-6 py-2 rounded-full text-sm hover:bg-[#A37B63] transition-colors">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                      {/* Texte en dessous */}
                      <div className="text-center py-3">
                        <h3 className="text-[#7A5C4B] text-sm">
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
            <Link href="/promo" className="text-[#7A5C4B] hover:text-[#A37B63]">
              Promotion
            </Link>
          </li>
          <li>
            <a href="#" className="text-[#7A5C4B] hover:text-[#A37B63]">
              Nos créateurs
            </a>
          </li>
        </ul>

        {/* Logo au centre */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#7A5C4B] font-cursive">
            Monica{" "}
            <span className="text-2xl font-cursive text-gray-600">Mariage</span>
          </h1>
        </div>

        {/* Menu de droite */}
        <div className="flex items-center space-x-5">
          <Link href="/contact" className="text-[#7A5C4B] hover:text-[#A37B63]">
            Prendre Rendez-Vous
          </Link>
          <Link
            href="/nous-trouver"
            className="text-[#7A5C4B] hover:text-[#A37B63]"
          >
            Trouver le showroom
          </Link>
          <button className="p-2">
            <svg
              className="w-6 h-6 text-[#7A5C4B] hover:text-[#A37B63]"
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
      <nav className="flex md:hidden bg-white shadow-md px-4 py-2 justify-between items-center">
        {/* Menu button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl text-[#7A5C4B]"
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Logo/Title */}
        <Link
          href="/"
          className="text-xl font-bold text-[#7A5C4B] font-[Playfair]"
        >
          Monica <span className="text-sm text-gray-600">Mariage</span>
        </Link>

        {/* Location icon */}
        <button className="text-xl text-[#7A5C4B]" aria-label="Location">
          <FaLocationDot />
        </button>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 left-0 w-full h-full bg-[#F5E7DE] shadow-lg z-50"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-3xl text-[#7A5C4B]"
              aria-label="Fermer le menu"
            >
              <IoClose />
            </button>

            <ul className="flex flex-col items-center justify-center h-full space-y-8 text-center">
              <li>
                <Link
                  href="/robes-de-mariee"
                  className="text-2xl text-[#7A5C4B] hover:text-[#A37B63]"
                >
                  Robes de Mariée
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-2xl text-[#7A5C4B] hover:text-[#A37B63]"
                >
                  Tenues de Soirée
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-2xl text-[#7A5C4B] hover:text-[#A37B63]"
                >
                  Robes de Cortège
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-2xl text-[#7A5C4B] hover:text-[#A37B63]"
                >
                  Prendre Rendez-Vous
                </Link>
              </li>
              <li>
                <Link
                  href="/nous-trouver"
                  className="text-2xl text-[#7A5C4B] hover:text-[#A37B63]"
                >
                  Trouver le showroom
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
