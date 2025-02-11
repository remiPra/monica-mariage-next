import { useState, useEffect } from "react";

export default function VideoSlider() {
  // Tableau contenant les vidéos et leurs titres
  const slides = [
    { src: "video1.mp4", title: "Très Chic" },
    { src: "video2.mp4", title: "Élégance" },
    { src: "video3.mp4", title: "Sophistication" },
  ];

  // Index de la vidéo actuellement affichée
  const [currentSlide, setCurrentSlide] = useState(0);

  // Changement automatique de slide toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 10 000 ms = 10 secondes

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen mt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={slide.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
