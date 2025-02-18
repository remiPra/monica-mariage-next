"use client";

import { useState, useEffect, useRef } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp, FaPhone, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { TiPhone, TiPhoneOutline, TiThMenu } from "react-icons/ti";
// import { IoHomeOutline } from "react-icons/io5";
import { FaBridalWear, FaPercent, FaPencilAlt } from "react-icons/fa";
import { GiDressIcons, GiClothespin } from "react-icons/gi";
import { MdStorefront } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { PiDress } from "react-icons/pi";
import SocialIcons from "./SocialIcons";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [robes, setRobes] = useState([]);
  const router = useRouter();
  const galleryRef = useRef(null);
  const menuItemRef = useRef(null);
  const timeoutRef = useRef(null);

  // Charger les robes (même logique que précédemment)
  const chargerJSON = async () => {
    try {
      const response = await fetch("/robe-de-mariee.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier JSON");
      }
      const data = await response.json();
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

  // Autres fonctions de gestion (même logique que précédemment)
  const handleDressClick = (id) => {
    router.push(`/${id}`);
  };

  const startCloseTimer = () => {
    timeoutRef.current = setTimeout(() => {
      setIsGalleryOpen(false);
    }, 100);
  };

  const clearCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        galleryRef.current &&
        !galleryRef.current.contains(event.target) &&
        menuItemRef.current &&
        !menuItemRef.current.contains(event.target)
      ) {
        setIsGalleryOpen(false);
        clearCloseTimer();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [galleryRef, menuItemRef]);

  return (
    <header className="fixed top-0 w-full z-30">
      {/* Barre de contact mobile */}
      <div className="bg-[#A37B63] text-white text-sm py-2 px-4 flex justify-center lg:hidden">
        <div className="flex items-center gap-2">
          {/* Lien WhatsApp */}
          <a
            href="https://wa.me/33668300960"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <FaWhatsapp className="text-2xl" />
          </a>
          <a
            href="https://wa.me/33668300960"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xl"
          >
            06 68 30 09 60
          </a>
          {/* Lien téléphone */}
          <a href="tel:+33668300960" className="flex items-center gap-1">
            <TiPhone className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Navigation Desktop */}
      <nav className="hidden lg:flex bg-[#FDE9E6] items-center justify-between px-8 h-20">
        {/* Menu gauche */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center gap-1 text-[#7A5C4B] hover:text-[#A37B63]"
          >
            <IoHomeOutline />
            Accueil
          </Link>
          <Link
            href="/robes-de-mariee"
            className="text-[#7A5C4B] hover:text-[#A37B63]"
          >
            Robes de Mariée
          </Link>
          <Link href="/promo" className="text-[#7A5C4B] hover:text-[#A37B63]">
            Promotion
          </Link>
          <Link
            href="/nos-createurs"
            className="text-[#7A5C4B] hover:text-[#A37B63]"
          >
            Nos créateurs
          </Link>
        </div>

        {/* Logo central modifié */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-[#7A5C4B] font-cursive italic text-3xl">
            MonicaMariage
          </h1>
        </div>

        {/* Menu droit */}
        <div className="flex items-center space-x-8">
          <Link
            href="/prendre-rendez-vous"
            className="text-[#7A5C4B] hover:text-[#A37B63]"
          >
            Prendre Rendez-Vous
          </Link>
          <Link
            href="/trouver-le-showroom"
            className="text-[#7A5C4B] hover:text-[#A37B63]"
          >
            Trouver le showroom
          </Link>

          <Link href="/favoris">
            <FaHeart className="w-5 h-5 text-[#7A5C4B] hover:text-[#A37B63]" />
          </Link>
        </div>
      </nav>

      {/* Navigation Mobile */}
      <div className="lg:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-[#7A5C4B]"
        >
          <TiThMenu className="w-8 h-8" />
        </button>
        <h1 className="text-[#7A5C4B] font-cursive italic text-2xl">
          MonicaMariage
        </h1>
        <div className="flex gap-4">
          <FaLocationDot className="text-[#7A5C4B]" />
          <FaHeart className="text-[#7A5C4B]" />
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0  bg-[#FDE9E6] z-50 p-4"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-[#7A5C4B]"
            >
              <IoClose size={24} />
            </button>
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <span className="text-[#7A5C4B] mt-[-120px] font-cursive italic text-[40px] mb-8">
                MonicaMariage
              </span>

              {/* Menu Links - Remontés avec espace réduit */}
              <div className="flex flex-col items-center space-y-6">
                <Link
                  href="/"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <IoHomeOutline className="text-2xl" />
                  <span className="block">Accueil</span>
                </Link>

                <Link
                  href="/favoris"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <FaHeart className="text-2xl" />
                  <span className="block">Mes Favoris</span>
                </Link>

                <Link
                  href="/robes-de-mariee"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <PiDress className="text-2xl" />
                  <span className="block">Robes de Mariée</span>
                </Link>

                <Link
                  href="/promo"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <FaPercent className="text-2xl" />
                  <span className="block">Promotion</span>
                </Link>

                <Link
                  href="/nos-createurs"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <GiClothespin className="text-2xl" />
                  <span className="block">Nos créateurs</span>
                </Link>

                <Link
                  href="/prendre-rendez-vous"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <BsCalendarCheck className="text-2xl" />
                  <span className="block">Prendre Rendez-Vous</span>
                </Link>

                <Link
                  href="/trouver-le-showroom"
                  className="group text-[#7A5C4B] text-xl flex items-center gap-4 transform transition-transform hover:-translate-y-1"
                >
                  <FaLocationDot className="text-2xl" />
                  <span className="block">Trouver le showroom</span>
                </Link>

                {/* ... autres liens ... */}
              </div>

              {/* Séparateur et icônes sociales */}
              <div className="w-full mt-auto flex flex-col items-center">
                <div className="w-1/2 h-[1px] bg-[#7A5C4B] opacity-30 mb-6"></div>
                <div className="mb-8">
                  <SocialIcons center="center" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
