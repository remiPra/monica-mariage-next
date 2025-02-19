"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function ImageSlider() {
  const [robes, setRobes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const jsonPath = "/forme-sirene.json";

  useEffect(() => {
    const chargerJSON = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("Erreur de chargement JSON");
        const data = await response.json();

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
    <div className="w-full max-w-[350px] mx-auto relative swiper-container">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
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
      <div className="swiper-pagination"></div>
      <style jsx>{`
        .swiper-container {
          --swiper-pagination-color: #af7749; /* Marron pour l'état actif */
          --swiper-pagination-bullet-inactive-color: #ddd; /* Gris clair pour l'état inactif */
        }

        .swiper-pagination-bullet {
          background-color: var(--swiper-pagination-bullet-inactive-color);
          opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
          background-color: var(--swiper-pagination-color);
          opacity: 1;
        }

        .swiper-pagination {
          position: absolute;
          bottom: 10px; /* Ajustez cette valeur pour la position verticale */
          left: 0;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
