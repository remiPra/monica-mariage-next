"use client";

import { useState, useEffect } from "react";

export default function A2HSBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Intercepter l'événement 'beforeinstallprompt'
    const handler = (e) => {
      e.preventDefault(); // Empêche l'affichage auto
      setDeferredPrompt(e); // Stocke l'événement
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 2. Après 30 secondes, si on a intercepté un événement,
    //    on affiche la bannière.
    const timer = setTimeout(() => {
      if (deferredPrompt) {
        setShowBanner(true);
      }
    }, 30000);

    // Nettoyage à la fin
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  // 3. Quand l'utilisateur clique sur "Installer"
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // Affiche la boîte de dialogue
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("Utilisateur a accepté l'installation");
    } else {
      console.log("Utilisateur a refusé l'installation");
    }
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  // 4. Affichage d'une bannière personnalisée
  return (
    <>
      {showBanner && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "white",
            padding: "16px",
            borderTop: "1px solid #ccc",
            textAlign: "center",
          }}
        >
          <p>Installer l'application Monica Mariage ?</p>
          <button
            style={{
              marginTop: "8px",
              padding: "8px 16px",
              backgroundColor: "#af7749",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={handleInstallClick}
          >
            Installer
          </button>
        </div>
      )}
    </>
  );
}
