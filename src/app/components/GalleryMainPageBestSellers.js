"use client";
import { motion } from "framer-motion";

const bestSellers = [
  {
    src: "/presentation/image1.jpg",
    alt: "Robe de mariée Déesse - Monica Mariage Toulouse",
    label: "Déesse",
  },
  {
    src: "/presentation/image2.jpg",
    alt: "Robe de mariée Effie - Monica Mariage Toulouse",
    label: "Effie",
  },
  {
    src: "/presentation/image3.jpg",
    alt: "Robe de mariée Emery - Monica Mariage Toulouse",
    label: "Emery",
  },
  {
    src: "/presentation/image4.jpg",
    alt: "Robe de mariée Signature - Monica Mariage Toulouse",
    label: "Signature",
  },
];

export default function GalleryMainPageBestSellers() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
      <motion.h2
        className="text-center text-3xl font-semibold text-[#af7749] mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meilleures ventes chez Monica Mariage&nbsp;: Des robes de mariée
        incontournables à Toulouse
      </motion.h2>

      <div className="flex justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {bestSellers.map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Icône de cœur en haut à droite */}

              {/* Image avec effet hover */}
              <motion.img
                src={item.src}
                alt={item.alt}
                className="w-full h-[400px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Contenu sous l’image */}
              <div className="text-center p-4">
                <p className="text-lg font-semibold text-[#af7749]">
                  {item.label}
                </p>
                <motion.button
                  className="mt-2 bg-[#af7749] text-white py-2 px-6 rounded-lg shadow hover:bg-[#925c36] transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Découvrir plus
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
