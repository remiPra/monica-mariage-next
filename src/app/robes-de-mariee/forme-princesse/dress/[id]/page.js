"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import DressImageSlider from "@/app/components/DressImageSlider";
import DressInfo from "@/app/components/DressInfo";
import { MdSms } from "react-icons/md"; // Icône de chat style SMS
import MobileActions from "@/app/components/MobileActions";
import Loader from "@/app/components/LoaderMonicaMariage";

export default function DressDetailPage() {
  const { id } = useParams();

  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch("/forme-princesse.json");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const data = await response.json();

        const robeTrouvee = data.find((r) => r.id === parseInt(id));
        if (robeTrouvee) {
          const imagesAssociees = data.filter(
            (r) => r.dressName === robeTrouvee.dressName
          );
          setRobe(robeTrouvee);
          setAllImages(imagesAssociees);
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

      {/* Floating Button pour le Chat (mobile only) */}
      {/* Boutons d'actions mobiles */}
      <MobileActions
        onChatClick={() => alert("Ouverture du chat")}
        onBookingClick={() => alert("Réservation d’un rendez-vous")}
      />
    </>
  );
}
