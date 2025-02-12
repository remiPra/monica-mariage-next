"use client";
// pages/index.js
import Head from "next/head";
import VideoSlider from "./components/VideoSlider";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Monica Mariage - Robes de mariées Toulouse</title>
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

      {/* HEADER */}
      <Header />

      {/* Video Slider */}
      <VideoSlider />

      {/* Bloc Catégories */}
      <section className="py-5 bg-white">
        <div className="flex justify-around items-center">
          {[
            "Robes de mariée Princesse et évasée",
            "Robes de mariée Princesse et évasée",
            "Robes de mariée Princesse et évasée",
            "Robes de mariée Princesse et évasée",
          ].map((text, index) => (
            <div key={index} className="text-center w-36">
              <img
                src="image/iconerobe.png"
                alt="Robes de mariée icon"
                className="w-24 mx-auto mb-2"
              />
              <p className="text-base text-black">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloc Présentation */}
      <section className="text-center py-12 bg-gradient-to-b from-[#FDE9E6] to-white">
        <h1 className="text-3xl font-semibold text-[#af7749] mb-4">
          Robes De Mariée Toulouse
        </h1>
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
      </section>

      {/* Bloc Bestsellers */}
      <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
        <h2 className="text-center text-3xl font-semibold text-[#af7749] mb-8">
          Meilleures ventes chez Monica Mariage
        </h2>
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
            {[
              {
                src: "./presentation/image1.jpg",
                alt: "Déesse",
                label: "Déesse",
              },
              {
                src: "./presentation/image2.jpg",
                alt: "Effie",
                label: "Effie",
              },
              {
                src: "./presentation/image3.jpg",
                alt: "Emery",
                label: "Emery",
              },
              {
                src: "./presentation/image4.jpg",
                alt: "Image 4",
                label: "Image 4",
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
            La boutique de mariage est conçue comme un showroom privé à Seysses
            près de Toulouse. Nous sommes heureux de vous accompagner pour la
            confection des robes de mariée sur-mesure et personnalisable jusqu'à
            la taille 44. Le tarif d'une robe de mariée sur-mesure se situe
            entre 750€ et 1850€.
          </p>
          <button className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow hover:bg-[#925c36] transition duration-300">
            Voir plus de robes
          </button>
        </div>
      </section>

      {/* Bloc Destockage */}
      <section className="py-12 bg-gradient-to-b from-white to-[#FDE9E6]">
        <h2 className="text-center text-3xl font-semibold text-[#af7749] mb-8">
          Destockage
        </h2>
        <div className="flex justify-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
            {[
              {
                src: "image/destockage/image1.png",
                alt: "Déesse",
                label: "Déesse",
              },
              {
                src: "image/destockage/image2.jpg",
                alt: "Effie",
                label: "Effie",
              },
              {
                src: "image/destockage/image3.jpg",
                alt: "Emery",
                label: "Emery",
              },
              {
                src: "image/destockage/image4.jpg",
                alt: "Image 4",
                label: "Image 4",
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
            La boutique de mariage est conçue comme un showroom privé à Seysses
            près de Toulouse. Nous sommes heureux de vous accompagner pour la
            confection des robes de mariée sur-mesure et personnalisable jusqu'à
            la taille 44. Le tarif d'une robe de mariée sur-mesure se situe
            entre 750€ et 1850€.
          </p>
          <button className="bg-[#af7749] text-white py-2 px-6 rounded-lg shadow hover:bg-[#925c36] transition duration-300">
            Voir plus de robes
          </button>
        </div>
      </section>

      {/* Section Showroom */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between px-4">
          {/* Colonne Image */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="double/2023-11-28.jpg"
              alt="LM Showroom"
              className="w-full rounded"
            />
          </div>
          {/* Colonne Texte */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h4 className="text-sm text-gray-500 uppercase mb-2">
              Le Showroom
            </h4>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-[Playfair]">
              LM Showroom
            </h2>
            <p className="text-base text-gray-600 mb-4">
              LM Showroom situé à Agen est un concept store mariage créé en 2023
              par Sandrine Bianco. Vous y trouverez plus d'une centaine de robes
              de mariée signées par des créateurs Européens et d'Outre
              Atlantique de renom, des tenues pour les mamans, les demoiselles
              d'honneur et les enfants, ainsi que des chaussures et des
              accessoires, sélectionnés avec la plus grande attention pour leur
              qualité, leur design et leur confort.
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
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between px-4">
          {/* Colonne Texte */}
          <div className="w-full md:w-1/2 md:pr-8 order-2 md:order-1">
            <h4 className="text-sm text-gray-500 uppercase mb-2">
              Le Showroom
            </h4>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-[Playfair]">
              LM Showroom
            </h2>
            <p className="text-base text-gray-600 mb-4">
              LM Showroom situé à Agen est un concept store mariage créé en 2023
              par Sandrine Bianco. Vous y trouverez plus d'une centaine de robes
              de mariée signées par des créateurs Européens et d'Outre
              Atlantique de renom, des tenues pour les mamans, les demoiselles
              d'honneur et les enfants, ainsi que des chaussures et des
              accessoires, sélectionnés avec la plus grande attention pour leur
              qualité, leur design et leur confort.
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
              alt="LM Showroom"
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
              src="path-to-logo.png"
              alt="LM Showroom Logo"
              className="w-32 mb-4"
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
                <a href="#" className="hover:text-[#af7749]">
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
                <a href="#" className="hover:text-[#af7749]">
                  Robes de mariée
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-[#af7749]">
                  Tenues de soirée
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
