"use client";

import { useState, useEffect } from "react";

export default function ContactFormOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  // Affiche le formulaire après 30 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Ferme l’overlay quand on clique sur la croix
  const handleClose = () => {
    setShowOverlay(false);
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez envoyer les données à un backend (API),
    // ou faire un console.log pour tester
    console.log("Form submitted");
    // Fermer l'overlay après la soumission
    setShowOverlay(false);
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          {/* Bouton de fermeture (croix) */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>

          {/* Contenu du formulaire (carte blanche au centre) */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
            <h2 className="text-2xl font-semibold text-[#af7749] mb-4">
              VOUS RÊVEZ DE LA ROBE PARFAITE ?
            </h2>
            <p className="text-gray-700 mb-4">
              Laissez-nous vos coordonnées pour que nous puissions vous aider à
              trouver la robe de vos rêves.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Prénom */}
              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom *
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  placeholder="Ex: Marie"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-[#af7749] focus:outline-none"
                />
              </div>

              {/* Nom */}
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom *
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  placeholder="Ex: Dupont"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-[#af7749] focus:outline-none"
                />
              </div>

              {/* E-mail */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="exemple@mail.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-[#af7749] focus:outline-none"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Téléphone portable *
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  required
                  placeholder="+33 6 12 34 56 78"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-[#af7749] focus:outline-none"
                />
              </div>

              {/* Région */}
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  Région *
                </label>
                <input
                  id="region"
                  name="region"
                  type="text"
                  required
                  placeholder="Ex: Occitanie"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-[#af7749] focus:outline-none"
                />
              </div>

              {/* Politique de confidentialité */}
              <p className="text-xs text-gray-500 mt-2">
                En vous inscrivant, vous confirmez que vous avez lu et accepté
                notre{" "}
                <a
                  href="/politique-de-confidentialite"
                  className="text-[#af7749] underline"
                >
                  Politique de confidentialité
                </a>
                .
              </p>

              {/* Bouton ENVOYER */}
              <button
                type="submit"
                className="w-full bg-[#af7749] text-white py-2 px-4 rounded-md hover:bg-[#925c36] transition-colors mt-4"
              >
                ENVOYER
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
