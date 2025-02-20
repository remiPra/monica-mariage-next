// app/pages/DressDetailPage.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import DressImageSlider from "@/app/components/DressImageSlider";
import DressInfo from "@/app/components/DressInfo";
import MobileActions from "@/app/components/MobileActions";
import Loader from "@/app/components/LoaderMonicaMariage";
import RelatedDressesView from "@/app/components/RelatedDressesView";
import AccordionRobe from "@/app/components/AccordionRobe";

export default function DressDetailPage() {
  const { id } = useParams();
  const [allDresses, setAllDresses] = useState([]);

  // Déclaration des états
  const [robe, setRobe] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chargerRobe = async () => {
      try {
        const response = await fetch("/forme-sirene.json");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON");
        }
        const data = await response.json();

        const robeTrouvee = data.find((r) => r.id === parseInt(id));
        if (robeTrouvee) {
          console.log(robeTrouvee);
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

  const sections = [
    {
      title: "Robe de Mariée Bohème et Élégante - Collection Monica Mariage",
      subtitle: "Une robe fluide et raffinée pour un mariage romantique",
      content:
        "Cette magnifique robe de mariée est idéale pour les futures mariées en quête de légèreté et d’élégance. Conçue avec un tissu fluide et des manches longues en tulle brodé, elle sublime la silhouette avec son décolleté en V. Parfaite pour un mariage en plein air ou une cérémonie intime.",
    },
    {
      title: "Détails et Finitions - Robe de Mariée Haut de Gamme",
      subtitle: "Des matières nobles pour une robe d’exception",
      content:
        "• Tissu : Mousseline fluide et tulle brodé\n• Manches longues transparentes ornées de broderies florales\n• Décolleté en V profond mais structuré\n• Ceinture drapée mettant en valeur la taille",
    },
    {
      title: "Pourquoi Choisir cette Robe ?",
      subtitle: "Une coupe intemporelle et adaptée à toutes les silhouettes",
      content:
        "Cette robe est parfaite pour une mariée recherchant une tenue à la fois bohème et sophistiquée. Sa fluidité apporte un confort optimal tout au long de la journée. Un modèle incontournable pour un mariage élégant en région toulousaine.",
    },
    {
      title: "Essayage en Boutique Monica Mariage",
      subtitle: "Prenez rendez-vous pour essayer cette robe en exclusivité",
      content:
        "Retrouvez cette robe dans notre boutique de robes de mariée Monica Mariage, située près de Toulouse. Nos conseillères vous accueillent pour un essayage personnalisé et vous accompagnent dans le choix de votre robe idéale.",
    },
  ];

  return (
    <>
      <Header />
      <Loader
        duration={1500} // Durée de 3 secondes
        text={robe.dressName}
      />
      <div className="mt-[100px] md:mt-[150px] max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* Section Image */}
        <div className="w-full lg:w-1/2">
          <DressImageSlider allImages={allImages} robe={robe} />
        </div>
        {/* Utilisation de dangerouslySetInnerHTML */}
        {/* <div dangerouslySetInnerHTML={{ __html: robe.Accordeon }} /> */}
        {/* Section Infos */}
        <div className="w-full lg:w-1/2">
          <DressInfo robe={robe} />
          {/* <AccordionRobe sections={robe.sections} /> */}
        </div>
      </div>

      {/* Section "Vous pourriez aussi aimer" */}
      <RelatedDressesView
        categorie="forme-sirene"
        currentDressId={robe.id}
        dresses={allDresses}
      />
      {/* Floating Button pour le Chat (mobile only) */}
      {/* Boutons d'actions mobiles */}
      <MobileActions
        chatMobile={true}
        onChatClick={() => alert("Ouverture du chat")}
        onBookingClick={() => alert("Réservation d’un rendez-vous")}
      />
    </>
  );
}
