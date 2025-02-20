"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const RendezVousButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false); // État pour gérer le changement de message

  // Afficher le bouton après 6 secondes
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
    setIsSent(false); // Réinitialise le message quand on ferme la modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer les données au backend
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, telephone, email, message }),
      });

      if (response.ok) {
        setIsSent(true); // Change le message en haut
        setTimeout(() => {
          const whatsappURL = `https://wa.me/${telephone.replace(
            /[^0-9]/g,
            ""
          )}`;
          window.location.href = whatsappURL; // Redirection automatique vers WhatsApp
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  // Animations
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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
          className="fixed z-40 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white w-full max-w-md p-5 rounded-lg"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {isSent
                ? "Vous allez être redirigé vers WhatsApp..."
                : "Prendre Rendez-vous"}
            </h3>
            <p className="text-xl text-gray-600 mb-4 text-center">
              {isSent
                ? "Merci ! Nous vous redirigeons vers WhatsApp pour finaliser votre prise de contact."
                : "Génial ! Vous souhaitez prendre rendez-vous ? Transmettez-moi votre numéro et je vous rappelle dès que possible !"}
            </p>

            {!isSent && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="prenom"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Prénom:
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Téléphone:
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email (optionnel):
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#af7749] hover:bg-[#825c4b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Envoyer
                  </button>
                  <button
                    className="inline-block align-baseline font-bold text-sm text-[#af7749] hover:text-[#825c4b]"
                    type="button"
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default RendezVousButton;
