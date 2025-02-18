import { useState, useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai"; // Import de l'icône

export default function VideoSlider() {
  // Tableau contenant les vidéos et leurs titres
  const slides = [
    { src: "video1.mp4", title: "Très Chic" },
    { src: "video2.mp4", title: "Élégance" },
    { src: "video3.mp4", title: "Sophistication" },
  ];

  // Index de la vidéo actuellement affichée
  const [currentSlide, setCurrentSlide] = useState(0);

  // Changement automatique de slide toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Fonction pour scroller vers la galerie
  const scrollToGallery = () => {
    document
      .getElementById("categorie")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen mt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Vidéo */}
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={slide.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay pour nuancer le blanc */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* <div className="absolute inset-0 bg-red-800/40"></div> */}

          {/* Titre centré */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}

      {/* Bouton flèche animée */}
      <button
        onClick={scrollToGallery}
        className="z-10 absolute bottom-[222px] left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
      >
        <AiOutlineDown
          size={40}
          className="animate-bounce transition-all duration-300"
        />
        <span className="font-cursive text-3xl font-medium mt-1 animate-pulse bg-gradient-to-r from-white to-[#af7749] bg-clip-text text-transparent">
          Voir la gallerie
        </span>
      </button>
    </div>
  );
}
