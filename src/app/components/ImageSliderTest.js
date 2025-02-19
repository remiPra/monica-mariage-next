"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ImageSliderTest({ data, alt }) {
  const [robes, setRobes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const chargerJSON = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(data);
        if (!response.ok) throw new Error("Erreur de chargement JSON");
        const jsonData = await response.json();

        // Assurez-vous que jsonData est un tableau
        if (!Array.isArray(jsonData)) {
          throw new Error("Les données JSON doivent être un tableau");
        }

        setRobes(jsonData);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    chargerJSON();
  }, [data]);

  if (isLoading) {
    return <div className="text-center p-10 text-[#af7749]">Chargement...</div>;
  }

  if (!robes || robes.length === 0) {
    return (
      <div className="text-center p-10 text-[#af7749]">
        Aucune robe à afficher.
      </div>
    );
  }

  return (
    <div className="w-full h-full relative swiper-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="rounded-lg shadow-lg"
        ref={swiperRef}
      >
        {robes.map((robe, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-96 w-full">
              <Image
                src={robe.optimizedImages.slider.desktop}
                alt={alt}
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
          --swiper-pagination-color: #af7749;
          --swiper-pagination-bullet-inactive-color: #ddd;
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
          bottom: 10px;
          left: 0;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
