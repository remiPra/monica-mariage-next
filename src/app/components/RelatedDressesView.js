"use client";

import Image from "next/image";
import Link from "next/link";

const RelatedDressesView = ({ currentDressId, dresses }) => {
  // Filtrer les robes pour exclure celle actuellement sélectionnée
  const filteredDresses = dresses.filter(
    (dress) => dress.id !== currentDressId
  );

  // Sélectionner 6 robes aléatoires
  const randomDresses = filteredDresses
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-20">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#af7749] mb-8 text-center">
        Vous pourriez aussi aimer
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {randomDresses.map((dress) => (
          <Link
            key={dress.id}
            href={`/robes-de-mariee/style-boheme-chic/dress/${dress.id}`}
            className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={dress.imageUrl}
                alt={dress.dressName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            </div>
            <div className="p-2 bg-white text-center">
              <h3 className="text-[#af7749] text-sm font-medium">
                {dress.dressName}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedDressesView;
