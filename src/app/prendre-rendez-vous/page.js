"use client";
import React from "react";
import Header from "../components/Header";
import SocialIcons from "../components/SocialIcons";
import { motion } from "framer-motion";

export default function Page() {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  return (
    <>
      <Header />

      <motion.div
        className="bg-[#a37b63] container my-[70px] mx-auto mt-[70px]"
        {...fadeInAnimation}
      >
        {/* On gère l'ordre des colonnes : la colonne de droite (formulaire) passe en premier sur mobile */}
        <div className="flex flex-col md:flex-row">
          {/* --- Colonne GAUCHE (infos + image de fond) --- */}
          <div
            className="md:w-1/2 relative order-2 md:order-1"
            style={{
              backgroundImage: "url('/contact.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              overflow: "hidden",
            }}
          >
            {/* Overlay marron */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundColor: "rgba(181 ,116, 75 , 0.7)",
                //   backgroundImage: "url('/contact.jpg')",
              }}
            ></div>

            <div className="mt-[40px] mb-5 relative z-10">
              <SocialIcons />
            </div>

            <motion.div
              className="rounded-lg shadow-md p-8 max-w-xl mx-auto relative z-10"
              {...fadeInAnimation}
            >
              {/* Titre visible UNIQUEMENT sur desktop */}
              <motion.h1
                className="hidden md:block font-cursive text-center text-5xl font-script text-white mb-2 relative"
                {...fadeInAnimation}
              >
                Monica Mariage
              </motion.h1>

              {/* Carte avec les informations principales */}
              <motion.div
                className="rounded-lg p-6 shadow-sm mb-2 relative"
                {...fadeInAnimation}
              >
                <div className="text-center text-white space-y-2">
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

              <div className="flex justify-center w-full mb-2">
                <img src="./taille.jpg" alt="Tableau des tailles" />
              </div>

              {/* Carte des horaires */}
              <motion.div
                className="rounded-lg p-6 shadow-sm relative"
                {...fadeInAnimation}
              >
                <h2 className="text-center text-white font-semibold text-xl mb-4">
                  Horaires d'ouverture
                </h2>
                <div className="grid grid-cols-1 gap-2 text-white">
                  {[
                    "Lundi",
                    "Mardi",
                    "Mercredi",
                    "Jeudi",
                    "Vendredi",
                    "Samedi",
                  ].map((jour) => (
                    <motion.div
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

          {/* --- Colonne DROITE (formulaire) --- */}
          <div
            className="md:bg-none md:bg-[rgba(181,116,75,0.7)] bg-[url('/contact.jpg')] md:w-1/2 relative order-1 md:order-2"
            style={{
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            {/* Overlay bleu uniquement sur mobile */}
            <div className="block md:hidden absolute top-0 left-0 w-full h-full bg-customBrown z-0"></div>

            {/* Tout le contenu en z-10 pour être par-dessus l'overlay */}
            <div className="relative z-10">
              <div className="block md:hidden mt-5">
                <SocialIcons />
              </div>

              {/* Titre visible UNIQUEMENT sur mobile */}
              <motion.h1
                className="mt-5 block md:hidden font-cursive text-center text-5xl font-script text-white mb-4"
                {...fadeInAnimation}
              >
                Monica Mariage
              </motion.h1>

              <motion.h2
                className="mt-3 text-center text-2xl font-script text-white mb-6"
                {...fadeInAnimation}
              >
                Contactez-moi
              </motion.h2>

              <form className="space-y-4">
                <motion.input
                  type="text"
                  placeholder="Nom *"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="email"
                  placeholder="Email *"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="tel"
                  placeholder="Portable *"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Date du mariage *"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Taille (voir le tableau ci-dessous)"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Forme préférée (Princesse / Sirène / Bohème / Je ne sais pas)"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Budget défini *"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.textarea
                  placeholder="Message *"
                  className="w-full p-2 border border-gray-300 rounded h-32"
                  required
                  {...fadeInAnimation}
                />
                <motion.button
                  type="submit"
                  className="bg-[#53240f] text-white px-6 py-2 rounded hover:bg-[#6b2f13]"
                  {...fadeInAnimation}
                >
                  Envoyer
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
