import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaComments,
  FaTimes,
} from "react-icons/fa";
import "./FloatingButton.css";
import { TiPhone } from "react-icons/ti";

const FloatingButtonMainPage = () => {
  const icons = [FaFacebookF, FaWhatsapp, FaInstagram, FaComments];
  const colors = [
    "bg-[#a77c60]",
    "bg-[#c4a484]",
    "bg-[#d2b48c]",
    "bg-[#b29079]",
  ]; // Nuances élégantes de la palette graphique
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const IconComponent = icons[currentIconIndex];
  const bgColor = colors[currentIconIndex];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-24 right-6 z-60">
      <button
        className={`w-14 h-14 flex items-center justify-center rounded-full text-white text-2xl shadow-lg transition-all transform hover:scale-110 fade-in ${bgColor}`}
        onClick={() => setIsOpen(true)}
      >
        <IconComponent className="transition-opacity duration-1000 ease-in-out" />
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-white text-[#a77c60] flex flex-col items-center justify-center p-6 transition-transform transform ${
            isClosing ? "slide-out" : "slide-in"
          }`}
        >
          <button
            className="absolute top-6 right-6 text-3xl text-[#a77c60] transition-opacity duration-500 hover:opacity-70"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
          <h2 className="text-3xl font-bold mb-6">Prenons contact !</h2>
          <p className="text-lg mb-8">
            Nous sommes disponibles sur plusieurs plateformes, choisissez votre
            moyen de communication préféré :
          </p>
          <div className="space-y-4 w-full max-w-xs">
            <a
              href="https://wa.me/33668300960?text=Bonjour%20Monica%20Mariage%20!"
              className="flex items-center justify-center bg-[#a77c60] text-white p-3 rounded-full text-xl w-full transition-transform transform hover:scale-105"
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </a>
            <a
              href="tel:+33668300960"
              className="flex items-center justify-center bg-[#a77c60] text-white p-3 rounded-full text-xl w-full transition-transform transform hover:scale-105"
            >
              <TiPhone className="mr-2" /> Message
            </a>
            <a
              href="https://facebook.com"
              className="flex items-center justify-center bg-[#a77c60] text-white p-3 rounded-full text-xl w-full transition-transform transform hover:scale-105"
            >
              <FaFacebookF className="mr-2" /> Facebook
            </a>

            <a
              href="https://www.instagram.com/monicamariage/"
              className="flex items-center justify-center bg-[#a77c60] text-white p-3 rounded-full text-xl w-full transition-transform transform hover:scale-105"
            >
              <FaInstagram className="mr-2" /> Instagram
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButtonMainPage;
