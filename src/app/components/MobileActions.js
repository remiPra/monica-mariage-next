"use client";

import { MdSms } from "react-icons/md";
import RendezVousButton from "./RendezVousButton";

export default function MobileActions({ onChatClick, onBookingClick }) {
  return (
    <>
      {/* Floating Button pour le Chat (mobile only) */}
      <button
        className="fixed z-[5555] bottom-20 right-6 md:bottom-8 md:right-8 bg-[#A37B63] text-white p-4 rounded-full shadow-lg hover:bg-[#b59375] transition md:hidden"
        onClick={onChatClick}
      >
        <MdSms size={24} />
      </button>

      {/* Bouton "Prendre Rendez-vous" (mobile only) */}
      {/* <button
        className="fixed bottom-0 mb-1 ml-1 mr-1 font-cursive rounded-md left-0 w-full bg-[#A37B63] text-white py-4 text-center text-2xl
          shadow-md hover:bg-[#b59375] transition md:hidden"
        onClick={onBookingClick}
      >
        Prendre rendez-vous
      </button> */}
      <RendezVousButton />
    </>
  );
}
