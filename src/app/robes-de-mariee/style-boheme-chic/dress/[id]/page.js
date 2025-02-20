"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import DressImageSlider from "@/app/components/DressImageSlider";
import DressInfo from "@/app/components/DressInfo";
import MobileActions from "@/app/components/MobileActions";
import Loader from "@/app/components/LoaderMonicaMariage";
import Image from "next/image";
import RelatedDressesView from "@/app/components/RelatedDressesView";

export default function DressDetailPage() {
  const { id } = useParams();
  const [allDresses, setAllDresses] = useState([]);
  // Déclaration des états
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [randomRobes, setRandomRobes] = useState([]); // Pour stocker les 6 robes aléatoires

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch("/style-boheme-chic.json");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const data = await response.json();

        const robeTrouvee = data.find((r) => r.id === parseInt(id));
        if (robeTrouvee) {
          // Toutes les images associées à la robe (si le JSON en contient plusieurs)
          const imagesAssociees = data.filter(
            (r) => r.dressName === robeTrouvee.dressName
          );
          setRobe(robeTrouvee);
          setAllImages(imagesAssociees);

          // Filtre la robe actuelle et sélectionne 6 robes aléatoires parmi les autres
          const autresRobes = data.filter((r) => r.id !== parseInt(id));
          const robesAleatoires = autresRobes
            .sort(() => 0.5 - Math.random()) // Mélange l’array
            .slice(0, 6); // Garde seulement 6 résultats

          setAllDresses(robesAleatoires);
          setIsLoading(false);

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setIsLoading(false);
      }
    };

    if (id) {
      chargerRobe();
    }
  }, [id]);

  if (isLoading || !robe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-48 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Loader
        duration={2000} // Durée de 3 secondes
        text={`Robe de Mariée ${robe.dressName}`}
      />

      <div className="mt-[100px] md:mt-[150px] max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* Section Image */}
        <div className="w-full lg:w-1/2">
          <DressImageSlider allImages={allImages} robe={robe} />
        </div>

        {/* Section Infos */}
        <div className="w-full lg:w-1/2">
          <DressInfo robe={robe} />
        </div>
      </div>

      {/* Section "Vous pourriez aussi aimer" */}
      <RelatedDressesView currentDressId={robe.id} dresses={allDresses} />

      {/* Floating Button pour le Chat (mobile only) */}
      <MobileActions
        chatMobile={true}
        onChatClick={() => alert("Ouverture du chat")}
        onBookingClick={() => alert("Réservation d’un rendez-vous")}
      />
    </>
  );
}
