"use client";

import { useState, useEffect } from "react";

export default function A2HSBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà fermé ou installé la PWA
    const isDismissed = localStorage.getItem("pwaBannerDismissed") === "true";
    if (isDismissed) {
      // Si c'est déjà "true", on ne fait rien : la bannière ne s'affichera pas
      return;
    }

    // Sinon, on écoute l'événement 'beforeinstallprompt'
    const handler = (e) => {
      e.preventDefault(); // Empêche l'affichage auto du prompt
      setDeferredPrompt(e); // On stocke l'événement pour l'utiliser plus tard
    };

    window.addEventListener("beforeinstallprompt", handler);

    // On attend 90 secondes avant d'afficher la bannière
    const timer = setTimeout(() => {
      if (deferredPrompt) {
        setShowBanner(true);
      }
    }, 90000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  // L'utilisateur clique sur "Installer"
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("Utilisateur a accepté l'installation");
    } else {
      console.log("Utilisateur a refusé l'installation");
    }

    // Qu'il accepte ou refuse, on retient qu'il ne faut plus réafficher la bannière
    localStorage.setItem("pwaBannerDismissed", "true");
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  // L'utilisateur ferme la bannière sans cliquer sur "Installer"
  const handleClose = () => {
    setShowBanner(false);
    // On mémorise qu'il a fermé pour ne plus réafficher la bannière
    localStorage.setItem("pwaBannerDismissed", "true");
  };

  return (
    <>
      {showBanner && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Bouton de fermeture en haut à droite */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              zIndex: 35,
              top: "16px",
              right: "16px",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>

          {/* Contenu principal de l'overlay */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h2 style={{ margin: "0 0 16px" }}>
              Installer l'application Monica Mariage ?
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Profitez d'une expérience complète en l'installant sur votre
              appareil.
            </p>
            <button
              onClick={handleInstallClick}
              style={{
                backgroundColor: "#af7749",
                color: "#fff",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Installer
            </button>
            <button
              onClick={handleClose}
              style={{
                backgroundColor: "#af7749",
                color: "#fff",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Installer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
