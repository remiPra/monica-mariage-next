import React from "react";

function PresentationComponent({
  h1 = "Titre par défaut",
  paragraph = "La taille et le tarif sont en bas des images",
  imageSrc = "/image/iconerobe.png",
  imageAlt = "Image par défaut",
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-cursive sm:text-4xl lg:text-5xl text-[#af7749] font-playfair mb-6 leading-tight">
        {h1}
      </h1>
      <img src={imageSrc} alt={imageAlt} className="w-24 mx-auto mb-2" />
      <p className="text-base sm:text-lg text-gray-600 font-poppins max-w-4xl mx-auto leading-relaxed mb-8">
        {paragraph}
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
        Accéder au menu
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
