"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "./swiper-custom.css"; // Ajout du CSS customisé

export default function SwiperTinder() {
  const [robes, setRobes] = useState([]);
  const swiperRef = useRef(null);

  // Charger les données du JSON
  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch("/style-boheme-chic.json");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const data = await response.json();

        // Filtrer pour ne garder qu'une seule image par robe unique
        const robesUniques = [];
        const nomsDejaVus = new Set();

        data.forEach((robe) => {
          if (!nomsDejaVus.has(robe.dressName)) {
            nomsDejaVus.add(robe.dressName);
            robesUniques.push(robe);
          }
        });

        setRobes(robesUniques);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    chargerRobe();
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;
    const heartButton = document.querySelector(".heart-button");
    const cancelButton = document.querySelector(".cancel-button");

    const nextSlide = () => {
      if (swiper.isEnd) {
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    };

    heartButton?.addEventListener("click", nextSlide);
    cancelButton?.addEventListener("click", nextSlide);

    return () => {
      heartButton?.removeEventListener("click", nextSlide);
      cancelButton?.removeEventListener("click", nextSlide);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Swiper Container */}
      <div className="fenetre">
        {robes.length > 0 ? (
          <Swiper
            ref={swiperRef}
            effect="cards"
            grabCursor={true}
            keyboard={true}
            modules={[EffectCards, Keyboard]}
            className="mySwiper"
          >
            {robes.map((robe, index) => (
              <SwiperSlide key={index}>
                <img src={robe.imageUrl} alt={robe.dressName} />
                <div className="slide-content">{robe.dressName}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Chargement des robes...</p>
        )}
      </div>

      {/* Tinder Buttons */}
      <div className="tinder-buttons mt-4 flex space-x-4">
        <button className="tinder-button cancel-button">❌</button>
        <button className="tinder-button heart-button">❤️</button>
      </div>
    </div>
  );
}
