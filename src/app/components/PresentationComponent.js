import React from "react";

function PresentationComponent() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-cursive sm:text-4xl lg:text-5xl text-[#af7749] font-playfair mb-6 leading-tight">
        Promotions robes de mariée de la boutique Monica mariage
      </h1>
      <img
        src="image/iconerobe.png"
        alt="Robes de mariée icon"
        className="w-24 mx-auto mb-2"
      />
      <p className="text-base sm:text-lg text-gray-600 font-poppins max-w-4xl mx-auto leading-relaxed mb-8">
        Découvrez notre sélection exclusive et sublimez votre jour J Robes de
        mariée taille 36-42 à prix imbattables!
      </p>

      {/* Nouveau bouton de défilement */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#af7749] text-white rounded-full hover:bg-[#8b5e3a] transition-colors duration-300"
      >
        Acceder au menu
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
}

export default PresentationComponent;
