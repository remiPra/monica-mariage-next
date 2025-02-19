"use client";
// pages/index.js
import Head from "next/head";
import VideoSlider from "./components/VideoSlider";
import Header from "./components/Header";
import Loader from "./components/LoaderMonicaMariage";
import SocialIcons from "./components/SocialIcons";
import GalleryIconmainPage from "./components/GalleryIconmainPage";
import FloatingButtonMainPage from "./components/FloatingButtonMainPage";
import GalleryMainPageBestSellers from "./components/GalleryMainPageBestSellers";
import ImageSlider from "./slider/page";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Monica Mariage - Robe de mariée Toulouse</title>

        {/* Meta description SEO */}
        <meta
          name="description"
          content="Découvrez nos collections de robe de mariée à Toulouse dans notre showroom privé à Seysses. Sur-mesure et personnalisables jusqu'à la taille 44, tarifs entre 750€ et 1850€."
        />

        {/* Balises Open Graph */}
        <meta
          property="og:title"
          content="Monica Mariage - Robe de mariée Toulouse"
        />
        <meta
          property="og:description"
          content="Showroom privé à Seysses près de Toulouse, spécialisé dans la robe de mariée sur-mesure et personnalisable. Tarifs de 750€ à 1850€."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.monicamariage.com" />
        <meta
          property="og:image"
          content="https://www.monicamariage.com/image/og-image.jpg"
        />

        {/* Polices et icônes */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <Loader text="Votre boutique de robe de Mariée a Toulouse" />
      {/* HEADER */}
      <Header />

      {/* Video Slider */}
      <VideoSlider />

      {/* Bloc Présentation */}
      <section className="text-center py-12 bg-gradient-to-b from-[#FDE9E6] to-white">
        <h1 className="text-3xl font-semibold text-[#af7749] mb-4">
          Robes De Mariée Toulouse
        </h1>
        <div className="flex md:hidden flex-wrap justify-center gap-4">
          <ImageSlider data="/forme-sirene" />
        </div>
        <img
          src="image/iconerobe.png"
          alt="Robes de mariée icon"
          className="w-36 rounded-full mx-auto mb-4"
        />
        <p className="max-w-3xl mx-auto text-lg text-black leading-relaxed mb-8">
          La boutique de mariage est conçue comme un showroom privé à Seysses
          près de Toulouse. Nous sommes heureux de vous accompagner pour la
          confection des robes de mariée sur-mesure et personnalisable jusqu'à
          la taille 44. Le tarif d'une robe de mariée sur-mesure se situe entre
          750€ et 1850€.
        </p>
        <button className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow hover:bg-[#925c36] transition duration-300">
          Voir nos robes
        </button>
        {/* Bloc Catégories */}
        <div
          id="categorie"
          className="grid cursor-pointer grid-cols-2 md:grid-cols-4 gap-6 justify-items-center items-center"
        >
          {[
            "Robes de mariée forme princesse",
            "Robes de mariée forme sirène",
            "Robes de mariée minimaliste",
            "Robes de mariée style boheme chic ",
          ].map((text, index) => (
            <div
              key={index}
              className="text-center w-36 p-4 rounded-lg transition-all duration-300 ease-in-out 
                   hover:scale-110 border-red-300 border-1 hover:bg-customBrown hover:shadow-lg"
            >
              <img
                src="image/iconerobe.png"
                alt={`Icône - ${text}`}
                className="w-24 mx-auto mb-2 rounded-full transition-opacity duration-300 hover:opacity-80"
              />
              <p className="text-base text-black hover:text-white font-medium transition-colors duration-300">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Bloc Catégories */}
      <GalleryMainPageBestSellers />

      {/* Bloc Présentation (NE PAS MODIFIER) */}
      <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
        <h2 className="text-center text-3xl font-semibold text-[#af7749] mb-8">
          Meilleures ventes chez Monica Mariage&nbsp;: Des robes de mariée
          incontournables à Toulouse
        </h2>

        {/* Section avec grille optimisée */}
        <GalleryIconmainPage />
        <FloatingButtonMainPage />
        {/* Texte et bouton */}
        <div className="flex flex-col items-center mt-8 px-4">
          <p className="max-w-2xl mx-auto text-lg text-black leading-relaxed mb-6 text-center">
            Découvrez notre sélection de best-sellers, conçus pour sublimer
            chaque future mariée à la recherche d’une robe de mariée à Toulouse.
            Nous proposons des coupes variées (princesse, sirène, bohème, etc.)
            afin de répondre à tous les styles et toutes les silhouettes.
            Profitez de nos conseils d’experts pour trouver la robe parfaite qui
            vous fera rayonner le jour de votre mariage.
          </p>
          <button className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-[#925c36] transition duration-300">
            Voir plus de robes
          </button>
        </div>
      </section>

      {/* Bloc Bestsellers */}
      <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
        <h2 className="text-center text-3xl font-semibold text-[#af7749] mb-8">
          Meilleures ventes chez Monica Mariage&nbsp;: Des robes de mariée
          incontournables à Toulouse
        </h2>
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
            {[
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
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover rounded max-h-96"
                />
                <p className="mt-2 text-base font-medium text-black">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 px-4">
          <p className="max-w-2xl mx-auto text-lg text-black leading-relaxed mb-6 text-center">
            Découvrez notre sélection de best-sellers, conçus pour sublimer
            chaque future mariée à la recherche d’une robe de mariée à Toulouse.
            Nous proposons des coupes variées (princesse, sirène, bohème, etc.)
            afin de répondre à tous les styles et toutes les silhouettes.
            Profitez de nos conseils d’experts pour trouver la robe parfaite qui
            vous fera rayonner le jour de votre mariage.
          </p>
          <button className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow hover:bg-[#925c36] transition duration-300">
            Voir plus de robes
          </button>
        </div>
      </section>

      {/* Bloc Destockage */}
      <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
        <h2 className="text-center text-3xl font-semibold text-[#af7749] mb-8">
          Destockage&nbsp;: Trouvez votre robe de mariée à Toulouse à prix doux
        </h2>
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
            {[
              {
                src: "image/destockage/image1.png",
                alt: "Robe de mariée Déesse en déstockage - Toulouse",
                label: "Déesse",
              },
              {
                src: "image/destockage/image2.jpg",
                alt: "Robe de mariée Effie en déstockage - Toulouse",
                label: "Effie",
              },
              {
                src: "image/destockage/image3.jpg",
                alt: "Robe de mariée Emery en déstockage - Toulouse",
                label: "Emery",
              },
              {
                src: "image/destockage/image4.jpg",
                alt: "Robe de mariée Signature en déstockage - Toulouse",
                label: "Signature",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover rounded max-h-96"
                />
                <p className="mt-2 text-base font-medium text-black">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 px-4">
          <p className="max-w-2xl mx-auto text-lg text-black leading-relaxed mb-6 text-center">
            Profitez de notre sélection de robes de mariée en déstockage pour
            bénéficier de tarifs avantageux tout en conservant l’élégance et la
            qualité d’une robe de mariée à Toulouse. Nous mettons régulièrement
            à jour cette rubrique afin de vous proposer des modèles issus de nos
            collections antérieures, toujours disponibles en quantités limitées.
            Faites-vous plaisir sans dépasser votre budget pour le plus beau
            jour de votre vie !
          </p>
          <button className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow hover:bg-[#925c36] transition duration-300">
            Voir plus de robes
          </button>
        </div>
      </section>

      {/* Section Showroom (1ère partie) */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between px-4">
          {/* Colonne Image */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="double/2023-11-28.jpg"
              alt="Showroom Monica Mariage - Robe de mariée Toulouse"
              className="w-full rounded"
            />
          </div>
          {/* Colonne Texte */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h4 className="text-sm text-gray-500 uppercase mb-2">
              Le Showroom
            </h4>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-[Playfair]">
              Monica Mariage Showroom&nbsp;: Un espace dédié aux robes de mariée
              à Toulouse
            </h2>
            <p className="text-base text-gray-600 mb-4">
              Notre showroom privé, situé à Seysses près de Toulouse, vous
              accueille dans un espace intimiste dédié à l’essayage de votre
              future robe de mariée. Nous vous accompagnons dans le choix de la
              coupe, des tissus et des finitions pour que chaque détail reflète
              votre personnalité. Grâce à nos conseils personnalisés, vous
              vivrez une expérience unique et repartirez avec la robe parfaite
              pour votre grand jour.
            </p>
            <a
              href="/mobile.html"
              className="bg-[#d0a895] text-white py-2 px-4 rounded hover:bg-[#af7749] transition"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </section>

      {/* Section Showroom (2e partie) */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between px-4">
          {/* Colonne Texte */}
          <div className="w-full md:w-1/2 md:pr-8 order-2 md:order-1">
            <h4 className="text-sm text-gray-500 uppercase mb-2">
              Le Showroom
            </h4>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-[Playfair]">
              Monica Mariage&nbsp;: Plus de 100 créations pour sublimer votre
              mariage à Toulouse
            </h2>
            <p className="text-base text-gray-600 mb-4">
              Monica Mariage, créé en 2023 par Sandrine Bianco, propose plus
              d’une centaine de modèles de robes de mariée, des tenues pour les
              demoiselles d’honneur et les mamans, ainsi que des accessoires de
              qualité. Chaque création est sélectionnée avec soin pour
              satisfaire toutes vos envies, que vous rêviez d’une robe de mariée
              traditionnelle ou d’un style plus audacieux. Notre objectif :
              faire de votre mariage à Toulouse un moment inoubliable.
            </p>
            <a
              href="#"
              className="bg-[#d0a895] text-white py-2 px-4 rounded hover:bg-[#af7749] transition"
            >
              En savoir plus
            </a>
          </div>
          {/* Colonne Image */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0 order-1 md:order-2">
            <img
              src="double/2023-11-28.jpg"
              alt="Intérieur du showroom Monica Mariage - robe de mariée Toulouse"
              className="w-full rounded"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#925c36] text-white py-10">
        <div className="container mx-auto flex flex-wrap justify-between px-4">
          <div className="w-full md:w-1/4 mb-6">
            <img
              src="logo-new.png"
              alt="Monica Mariage Logo"
              className="w-32 mb-4 bg-white rounded-full  "
            />
            <p>+33 6 19 72 75 40</p>
            <p>monicamariage@hotmail.com</p>
          </div>
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-xl font-semibold text-[#af7749] mb-4">
              Informations
            </h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-[#af7749]">
                  Le showroom
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#af7749]">
                  Essayages
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#af7749]">
                  Trouver le showroom
                </a>
              </li>
              <li className="mb-2">
                <a href="/pndre-rendez-vous" className="hover:text-[#af7749]">
                  Prendre rendez-vous
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-xl font-semibold text-[#af7749] mb-4">
              Nos Produits
            </h4>
            <ul>
              <li className="mb-2">
                <a href="/robes-de-mariee" className="hover:text-[#af7749]">
                  Robes de mariée
                </a>
              </li>
              <li className="mb-2">
                <a href="/promo" className="hover:text-[#af7749]">
                  Promotion
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#af7749]">
                  Robes de cortège
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#af7749]">
                  Accessoires
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6">
            <h4 className="text-xl font-semibold text-[#af7749] mb-4">
              Nous suivre
            </h4>
            <SocialIcons center="flex-start" />
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-[#af7749]">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-2xl hover:text-[#af7749]">
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://www.facebook.com/MonicaMariage31/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#af7749]"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/monicamariage_robedemariee31/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#af7749]"
              >
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm">
          <p>
            &copy; 2023 - 2024 Monica Mariage Showroom – Tous droits réservés
          </p>
          <p>
            <a href="#" className="hover:text-[#af7749]">
              Mentions légales
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-[#af7749]">
              Conditions générales de vente
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
