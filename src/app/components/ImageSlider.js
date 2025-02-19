"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageSlider({ data }) {
  const [robes, setRobes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomed, setZoomed] = useState(false); // État du zoom
  const jsonPath = "/forme-sirene.json";

  useEffect(() => {
    const chargerJSON = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("Erreur de chargement JSON");
        const data = await response.json();

        // Suppression des doublons par dressName
        const robesUniques = data.filter(
          (robe, index, self) =>
            self.findIndex((r) => r.dressName === robe.dressName) === index
        );

        setRobes(robesUniques);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    chargerJSON();
  }, []);

  if (isLoading || robes.length === 0) {
    return <div className="text-center p-10 text-[#af7749]">Chargement...</div>;
  }

  return (
    <div className="w-full max-w-[350px] mx-auto relative">
      <Swiper
        modules={[Navigation, Pagination]} // Ajout du module Zoom
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true, el: ".swiper-pagination" }} // ✅ Pagination avec une classe
        loop
        className="rounded-lg shadow-lg"
      >
        {robes.map((robe, index) => (
          <SwiperSlide key={index}>
            <div className={`relative h-[600px] w-full transition-transform`}>
              <Image
                src={robe.optimizedImages.slider.desktop}
                alt={robe.dressName}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Boutons de navigation personnalisés */}
      {/* <button className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
        <FaChevronLeft size={24} className="text-[#af7749]" />
      </button>
      <button className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 bg-white border-2 border-red-400 p-8 rounded-full shadow-md z-10">
        <FaChevronRight size={24} className="text-[#af7749]" />
      </button> */}
      <div className="swiper-pagination mt-4"></div>
    </div>
  );
}
