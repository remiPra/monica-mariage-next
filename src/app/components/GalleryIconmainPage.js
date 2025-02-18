import { motion } from "framer-motion";

export default function GalleryIconmainPage() {
  const galleryItems = [
    {
      src: "./presentation/image1.jpg",
      alt: "Robe de mariée Déesse - Monica Mariage Toulouse",
      label: "Déesse",
    },
    {
      src: "./presentation/image2.jpg",
      alt: "Robe de mariée Effie - Monica Mariage Toulouse",
      label: "Effie",
    },
    {
      src: "./presentation/image3.jpg",
      alt: "Robe de mariée Emery - Monica Mariage Toulouse",
      label: "Emery",
    },
    {
      src: "./presentation/image4.jpg",
      alt: "Robe de mariée Signature - Monica Mariage Toulouse",
      label: "Signature",
    },
  ];

  return (
    <div className="flex justify-center px-4">
      {/* Conteneur global avec animation de groupe */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Lancement au scroll, 20% visible
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }, // Décalage entre les animations des enfants
          },
        }}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              className="w-full h-96 object-cover rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <p className="mt-2 text-lg font-medium text-black">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
