"use client";

import React from "react";
import Header from "../components/Header";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaPhone,
} from "react-icons/fa";
import SocialIcons from "../components/SocialIcons";
import { FaWaze } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { TfiApple } from "react-icons/tfi";
import { motion } from "framer-motion"; // Importez motion

function MapSection() {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <motion.div // Utilisez motion.div ici
      className="relative md:w-1/2"
      {...fadeInAnimation}
    >
      <h2 className="font-cursive mt-3 text-center text-[50px] font-script text-[#53240f] mb-6">
        Où nous trouver
      </h2>

      <div className="relative">
        {/* Overlay couleur unie */}
        <div className="absolute inset-0 bg-[#53240f]/50 pointer-events-none z-10 rounded-lg" />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.7441859891446!2d1.323562676013496!3d43.50767187110942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aeba19e17ca76b%3A0x179ca88590319aa3!2sMonica%20Mariage%20-%20boutique%20robe%20de%20mari%C3%A9e%20Toulouse!5e0!3m2!1sfr!2sfr!4v1739277867420!5m2!1sfr!2sfr"
          width="100%"
          height="300"
          className="rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center gap-6 mt-6">
        <a
          href="https://www.waze.com/ul?ll=43.507672,1.326138&navigate=yes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-[#53240f] hover:opacity-80"
          aria-label="Ouvrir dans Waze"
        >
          <FaWaze />
          <span className="text-sm mt-1">Waze</span>
        </a>

        <a
          href="https://www.google.com/maps/place/Monica+Mariage+-+boutique+robe+de+mariée+Toulouse"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-[#53240f] hover:opacity-80"
          aria-label="Ouvrir dans Google Maps"
        >
          <SiGooglemaps />
          <span className="text-sm mt-1">Google Maps</span>
        </a>

        <a
          href="http://maps.apple.com/?daddr=43.507672,1.326138"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-[#53240f] hover:opacity-80"
          aria-label="Ouvrir dans Apple Maps"
        >
          <TfiApple />
          <span className="text-sm mt-1">Apple Maps</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Page() {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <>
      <Header />
      <motion.div // Utilisez motion.div ici
        className="container my-[70px] mx-auto px-4 py-8"
        {...fadeInAnimation}
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Section gauche */}
          <div className="md:w-1/2 bg-white">
            <SocialIcons />

            <motion.div // Utilisez motion.div ici
              className="bg-[#FDF8F5] rounded-lg shadow-md p-8 max-w-xl mx-auto"
              {...fadeInAnimation}
            >
              <motion.h1 // Utilisez motion.h1 ici
                className="font-cursive text-center text-5xl font-script text-[#53240f] mb-2"
                {...fadeInAnimation}
              >
                Monica Mariage
              </motion.h1>

              {/* Carte avec les informations principales */}
              <motion.div // Utilisez motion.div ici
                className="bg-white rounded-lg p-6 shadow-sm mb-2"
                {...fadeInAnimation}
              >
                <div className="text-center text-[#53240f] space-y-2">
                  <p className="font-medium">1220 Chemin de Brouquère</p>
                  <p>31600 Seysses</p>
                  <div className="my-4 border-t border-[#53240f]/20 pt-4">
                    <p className="font-medium">06 68 30 09 60</p>
                    <p className="text-sm">(Heure d'appel 9h-20h)</p>
                  </div>
                  <a
                    href="mailto:monicamariage@hotmail.com"
                    className="text-[#53240f] hover:text-[#8B4513] underline decoration-dotted"
                  >
                    monicamariage@hotmail.com
                  </a>
                </div>
              </motion.div>

              {/* Carte des horaires */}
              <motion.div // Utilisez motion.div ici
                className="bg-white rounded-lg p-6 shadow-sm"
                {...fadeInAnimation}
              >
                <h2 className="text-center text-[#53240f] font-semibold text-xl mb-4">
                  Horaires d'ouverture
                </h2>
                <div className="grid grid-cols-1 gap-2 text-[#53240f]">
                  {[
                    "Lundi",
                    "Mardi",
                    "Mercredi",
                    "Jeudi",
                    "Vendredi",
                    "Samedi",
                  ].map((jour) => (
                    <motion.div // Utilisez motion.div ici
                      key={jour}
                      className="flex justify-between items-center py-2 border-b border-[#53240f]/10"
                      {...fadeInAnimation}
                    >
                      <span className="font-medium">{jour}</span>
                      <span className="text-sm">9h30-19h (sur RDV)</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Section droite (Carte) */}
          <MapSection />
        </div>
      </motion.div>
    </>
  );
}
