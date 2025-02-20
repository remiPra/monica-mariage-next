import Link from "next/link";
import { motion } from "framer-motion";
import FloatingButtonMainPage from "./FloatingButtonMainPage";

const MonicaMariageSection = () => {
  const robes = [
    {
      src: "./images/robes/gallery/desktop/monica-mariage-robe-de-mariee-princesse-annabella-22-gallery-desktop.webp",
      alt: "Robe de mariée Annabella - Monica Mariage Toulouse",
      label: "Annabella",
      link: "/robes-de-mariee/forme-princesse/dress/22",
    },
    {
      src: "./images/robes/gallery/desktop/monica-mariage-robe-de-mariee-princesse-brenda-12-gallery-desktop.webp",
      alt: "Robe de mariée Brenda - Monica Mariage Toulouse",
      label: "Brenda",
      link: "/robes-de-mariee/forme-princesse/dress/12",
    },
    {
      src: "https://static.wixstatic.com/media/176703_1e84261252d04a97aacf72593a839f09~mv2.jpg",
      alt: "Robe de mariée Minelly - Monica Mariage Toulouse",
      label: "Minelly",
      link: "/robes-de-mariee/style-boheme-chic/dress/19",
    },
    {
      src: "https://static.wixstatic.com/media/176703_999bc7e5222743938c0b8aeb353668a3~mv2.jpg",
      alt: "Robe de mariée Rusina - Monica Mariage Toulouse",
      label: "Rusina",
      link: "/robes-de-mariee/style-boheme-chic/dress/14",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
      {/* Animation du titre */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-cursive text-5xl text-center font-semibold text-[#af7749] mb-14"
      >
        Boutique Monica Mariage
        <br />
        Nouvelles Collections 2025 à Toulouse
      </motion.h2>

      <div className="flex justify-center px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl w-full">
          {robes.map((item, index) => (
            <motion.div
              key={index}
              className="text-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-lg transition-transform duration-300 ease-in-out"
              />
              <p className="mt-2 text-[#af7749] font-cursive text-2xl sm:text-3xl">
                {item.label}
              </p>
              <div className="mt-2">
                <Link href={item.link}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#af7749] text-white py-1 px-3 sm:py-2 sm:px-4 rounded-lg shadow-lg hover:bg-[#925c36] transition duration-300 text-sm sm:text-base"
                  >
                    Voir plus
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <FloatingButtonMainPage />

      {/* Animation du texte descriptif */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col items-center mt-8 px-4"
      >
        <p className="max-w-2xl mx-auto text-lg text-black leading-relaxed mb-6 text-center">
          Découvrez en exclusivité nos toutes dernières collections
          printemps-été. Des créations raffinées qui allient élégance moderne et
          romantisme intemporel, sélectionnées avec passion pour nos futures
          mariées toulousaines.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-[#925c36] transition duration-300 mb-4"
        >
          Voir plus de robes
        </motion.button>

        {/* Nouveau bouton "En savoir plus" */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white border-2 border-[#af7749] text-[#af7749] py-2 px-6 rounded-lg shadow-lg hover:bg-[#af7749] hover:text-white transition duration-300"
        >
          En savoir plus
        </motion.button>
      </motion.div>
    </section>
  );
};

export default MonicaMariageSection;
