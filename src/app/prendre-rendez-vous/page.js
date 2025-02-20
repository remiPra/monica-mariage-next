"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SocialIcons from "../components/SocialIcons";
import { motion } from "framer-motion";
import Loader from "../components/LoaderMonicaMariage";
import FloatingButtonMainPage from "../components/FloatingButtonMainPage";
import FAQAccordion from "../components/FAQAccordion";
import Image from "next/image";

const TailleModal = ({ isOpen, onClose, onSelectTaille }) => {
  const [tailleValue, setTailleValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectTaille(tailleValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full mx-4">
        <h2 className="font-cursive text-center text-4xl font-script text-[#53240f] mb-4">
          Tableau de mensuration
        </h2>

        <div className="mb-4">
          <Image
            src="/taille.jpg"
            alt="Tableau des tailles"
            width={800}
            height={600}
            quality={100}
            className="w-full h-auto"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={tailleValue}
            onChange={(e) => setTailleValue(e.target.value)}
            placeholder="Entrez votre taille"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-[#53240f] text-white px-6 py-2 rounded hover:bg-[#6b2f13]"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessModal = ({
  isOpen,
  onClose,
  name,
  email,
  phone,
  dateMariage,
  forme,
  budget,
  message,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        // Construire le message WhatsApp pré-défini
        const whatsappMessage = encodeURIComponent(
          `Bonjour Monica Mariage,\n\nJe suis ${name},\nEmail: ${email},\nDate du mariage: ${dateMariage},\nForme préférée: ${forme},\nBudget: ${budget},\nMessage: ${message}`
        );

        // Construire l'URL WhatsApp
        const whatsappURL = `https://wa.me/33668300960?text=${whatsappMessage}`;

        // Rediriger vers WhatsApp
        window.open(whatsappURL, "_blank");
        // Fermer la modal
        onClose();
      }, 3000);

      // Nettoyer le timer si le composant est démonté ou la modal est fermée
      return () => clearTimeout(timer);
    }
  }, [
    isOpen,
    onClose,
    phone,
    name,
    email,
    dateMariage,
    forme,
    budget,
    message,
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full mx-4">
        <h2 className="font-cursive text-center text-4xl font-script text-[#53240f] mb-4">
          Merci !
        </h2>
        <p className="text-center mb-4">
          Votre demande a été envoyée avec succès. Vous allez être redirigé vers
          WhatsApp.
        </p>
      </div>
    </div>
  );
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taille, setTaille] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateMariage, setDateMariage] = useState("");
  const [forme, setForme] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Nouvelle état pour la modal de succès

  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const formData = {
      name: name, // Ajoute les valeurs des inputs
      email: email,
      phone: phone,
      dateMariage: dateMariage,
      forme: forme,
      budget: budget,
      message: message,
      subject: "Demande de contact",
      message: `📅 Date du mariage : ${dateMariage}\n👗 Forme préférée : ${forme}\n💰 Budget : ${budget}\n📩 Message : ${message}`,
    };

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      setSuccess("Email envoyé avec succès !");
      setSuccessModalOpen(true); // Ouvrir la modal de succès
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setDateMariage("");
        setForme("");
        setBudget("");
        setMessage("");
      }, 5000);
    } else {
      setSuccess(`Erreur : ${data.message}`);
    }
  };

  return (
    <>
      <Header />
      <FloatingButtonMainPage />
      <Loader text="Prise de Rendez Vous " />
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
              <SocialIcons iconColor="white" center="center" />
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
                    className="text-white hover:text-[#8B4513] mt-8 underline decoration-dotted"
                  >
                    monicamariage@hotmail.com
                  </a>
                </div>
              </motion.div>
              {/*

              <div className="flex justify-center w-full mb-2">
                <img src="./taille.jpg" alt="Tableau des tailles" />
              </div> */}

              {/* Carte des horaires */}
              <motion.div
                className="rounded-lg p-6 shadow-sm relative"
                {...fadeInAnimation}
              >
                <h2 className="text-center text-white font-semibold text-xl mb-4">
                  Horaires d'ouverture
                </h2>
                <div className="grid grid-cols-1 gap-2 text-white items-center justify-items-center">
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
                      className="flex justify-between items-center py-2 border-b border-[#53240f]/10 w-[300px]"
                      {...fadeInAnimation}
                    >
                      <span className="font-medium text-lg">{jour}</span>
                      <span className="text-lg">9h30-19h (sur RDV)</span>
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
              <div className="block mt-8 md:hidden mb-8 ">
                <SocialIcons center="center" />
              </div>

              {/* Titre visible UNIQUEMENT sur mobile */}
              <motion.h1
                className="mt-5 block md:hidden font-cursive text-center text-5xl font-script text-white mb-10"
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.input
                  type="text"
                  placeholder="Nom *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="tel"
                  placeholder="Portable *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Date du mariage *"
                  value={dateMariage}
                  onChange={(e) => setDateMariage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  value={taille}
                  placeholder="Taille (voir le tableau ci-dessous)"
                  className="w-full p-2 border border-gray-300 rounded"
                  onClick={() => setIsModalOpen(true)}
                  readOnly
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Forme préférée (Princesse / Sirène / Bohème / Je ne sais pas)"
                  value={forme}
                  onChange={(e) => setForme(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  {...fadeInAnimation}
                />
                <motion.input
                  type="text"
                  placeholder="Budget défini *"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  {...fadeInAnimation}
                />
                <motion.textarea
                  placeholder="Message *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-32"
                  required
                  {...fadeInAnimation}
                />
                <motion.button
                  type="submit"
                  className="bg-[#53240f] text-white px-6 py-2 rounded hover:bg-[#6b2f13]"
                  disabled={loading}
                  {...fadeInAnimation}
                >
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
      <FAQAccordion />
      <TailleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTaille={(value) => setTaille(value)}
      />
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        name={name}
        email={email}
        phone={phone}
        dateMariage={dateMariage}
        forme={forme}
        budget={budget}
        message={message}
      />
    </>
  );
}
