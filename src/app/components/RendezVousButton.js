"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RendezVousButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Afficher le bouton 6 secondes après le chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Variantes d'animation pour le bouton
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Variantes d'animation pour l'overlay du modal
  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Variantes d'animation pour le contenu du modal
  const modalContentVariants = {
    hidden: { y: "100vh" },
    visible: { y: 0 },
  };

  return (
    <>
      {showButton && (
        <motion.a
          href="#"
          onClick={openModal}
          className="mt-6 fixed bottom-2 block w-full text-center bg-[#a37b63] text-white py-3 rounded-lg font-medium hover:bg-[#925c36] transition-all duration-300"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          PRENDRE RENDEZ-VOUS
        </motion.a>
      )}

      {showModal && (
        <motion.div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white w-full h-full flex flex-col items-center justify-center p-5"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Prendre Rendez-vous
            </h3>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Merci de nous contacter pour fixer un rendez-vous.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-3 bg-[#af7749] text-white rounded-full hover:bg-[#825c4b] transition-colors"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default RendezVousButton;
