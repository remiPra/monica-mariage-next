"use client";

import { useState, useEffect } from "react";

export default function ContactFormOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [alreadyDismissed, setAlreadyDismissed] = useState(false);

  useEffect(() => {
    const lastDismissTime = localStorage.getItem("overlayDismissedTime");
    const now = Date.now();
    const threeHours = 3 * 60 * 60 * 1000; // 3 heures en millisecondes

    if (lastDismissTime && now - parseInt(lastDismissTime, 10) < threeHours) {
      setAlreadyDismissed(true);
      return;
    }

    // Afficher l'overlay après 30 secondes
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowOverlay(false);
    localStorage.setItem("overlayDismissedTime", Date.now().toString()); // Stocke le timestamp
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setShowOverlay(false);
    localStorage.setItem("overlayDismissedTime", Date.now().toString()); // Stocke le timestamp
  };

  if (alreadyDismissed) return null;
  if (!showOverlay) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        animation: "fadeIn 0.3s ease-out forwards",
      }}
    >
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
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

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px 8px 0 0",
          padding: "24px",
          width: "100%",
          maxWidth: "500px",
          animation: "slideUp 0.3s ease-out forwards",
        }}
      >
        <h2 style={{ margin: "0 0 16px", color: "#af7749" }}>
          VOUS RÊVEZ DE LA ROBE PARFAITE ?
        </h2>
        <p style={{ marginBottom: "24px", color: "#333" }}>
          Laissez-nous vos coordonnées pour que nous puissions vous aider à
          trouver la robe de vos rêves.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              htmlFor="prenom"
              style={{ fontWeight: "bold", display: "block" }}
            >
              Prénom *
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              required
              placeholder="Ex: Marie"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="nom"
              style={{ fontWeight: "bold", display: "block" }}
            >
              Nom *
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              placeholder="Ex: Dupont"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{ fontWeight: "bold", display: "block" }}
            >
              E-mail *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="exemple@mail.com"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="telephone"
              style={{ fontWeight: "bold", display: "block" }}
            >
              Téléphone portable *
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              required
              placeholder="+33 6 12 34 56 78"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="dateDuMariage"
              style={{ fontWeight: "bold", display: "block" }}
            >
              Date du Mariage *
            </label>
            <input
              id="dateDuMariage"
              name="dateDuMariage"
              type="text"
              placeholder="Ex: 12/12/2025"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            />
          </div>

          <p style={{ fontSize: "12px", color: "#555" }}>
            En vous inscrivant, vous confirmez que vous avez lu et accepté notre{" "}
            <a
              href="/politique-de-confidentialite"
              style={{ color: "#af7749", textDecoration: "underline" }}
            >
              Politique de confidentialité
            </a>
            .
          </p>

          <button
            type="submit"
            style={{
              backgroundColor: "#af7749",
              color: "#fff",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ENVOYER
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
