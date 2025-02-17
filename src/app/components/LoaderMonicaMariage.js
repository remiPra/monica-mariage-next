// components/Loader.js
import { useEffect, useState } from "react";
import Image from "next/image";

const Loader = ({ duration = 1500, text }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [textFading, setTextFading] = useState(false);

  useEffect(() => {
    const progressDuration = duration - 1000;

    // Lancer la transition du texte 1 seconde avant la fin
    const startTextFading = setTimeout(() => {
      setTextFading(true);
    }, duration - 1000);

    // Lancer l’animation de sortie 500ms avant la fin
    const startLeaving = setTimeout(() => {
      setIsLeaving(true);
    }, duration - 500);

    // Retirer le loader complètement
    const hideLoader = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(startTextFading);
      clearTimeout(startLeaving);
      clearTimeout(hideLoader);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 
        flex flex-col items-center justify-center 
        bg-white
        transition-all duration-500 ease-in-out
        ${isLeaving ? "opacity-0" : "opacity-100"}
        z-50
      `}
    >
      <div
        className={`
          relative
          animate-gentle-pulse
          transition-all duration-1000 ease-in-out
          ${isLeaving ? "scale-125 opacity-0" : "scale-100 opacity-100"}
        `}
      >
        <Image
          src="/image/iconerobe.png"
          alt="Icon robe"
          width={100}
          height={100}
          className="rounded-full shadow-lg"
        />
      </div>

      <h1
        className={`
          mt-6 
          text-4xl 
          font-cursive
          text-[#A67B5B]
          transition-all duration-1000 ease-in-out
          ${textFading ? "animate-text-fade" : ""}
          ${isLeaving ? "scale-150 opacity-0" : "scale-100 opacity-100"}
        `}
      >
        MonicaMariage
      </h1>

      {text && (
        <p
          className={`
            mt-4 
            font-light
            text-[#A67B5B]
            transition-all duration-1000 ease-in-out
            ${textFading ? "animate-text-fade" : ""}
            ${
              isLeaving
                ? "translate-y-10 opacity-0"
                : "translate-y-0 opacity-100"
            }
          `}
        >
          {text}
        </p>
      )}

      <div className="w-64 h-1 bg-gray-100 rounded-full mt-8 overflow-hidden">
        <div
          className="h-full bg-[#A67B5B] rounded-full transform-origin-left"
          style={{
            width: "100%",
            transition: `transform ${duration - 1000}ms linear`,
            transform: isLeaving ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
