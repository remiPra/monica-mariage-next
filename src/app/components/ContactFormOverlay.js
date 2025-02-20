"use client";

import { useState, useEffect } from "react";

export default function ContactFormOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [alreadyDismissed, setAlreadyDismissed] = useState(false);
  const [formValues, setFormValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateDuMariage: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    const lastDismissTime = localStorage.getItem("overlayDismissedTime");
    const now = Date.now();

    // const threeHours = 1 * 60 * 60 * 1000;
    // const twentyMinutes = 20 * 60 * 1000; // 20 minutes en millisecondes

    const threeHours = 20 * 60 * 1000;
    if (lastDismissTime && now - parseInt(lastDismissTime, 10) < threeHours) {
      setAlreadyDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowOverlay(false);
    localStorage.setItem("overlayDismissedTime", Date.now().toString());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.prenom) {
      errors.prenom = "Le prénom est requis";
    }
    if (!formValues.nom) {
      errors.nom = "Le nom est requis";
    }
    if (!formValues.email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "L'email n'est pas valide";
    }
    if (!formValues.telephone) {
      errors.telephone = "Le téléphone est requis";
    } else if (!/^\+?\d{1,15}$/.test(formValues.telephone)) {
      errors.telephone = "Le téléphone n'est pas valide";
    }
    if (!formValues.dateDuMariage) {
      errors.dateDuMariage = "La date du mariage est requise";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmissionMessage("");
      try {
        const response = await fetch("/api/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          setSubmissionMessage("Formulaire soumis avec succès!");
          setFormValues({
            prenom: "",
            nom: "",
            email: "",
            telephone: "",
            dateDuMariage: "",
          });
          setFormErrors({});
          setTimeout(() => {
            setShowOverlay(false);
            localStorage.setItem("overlayDismissedTime", Date.now().toString());
          }, 2000);
        } else {
          const errorData = await response.json();
          setSubmissionMessage(
            `Erreur lors de la soumission du formulaire: ${errorData.message}`
          );
        }
      } catch (error) {
        setSubmissionMessage(`Erreur réseau: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
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
        aria-label="Fermer la fenêtre"
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
              value={formValues.prenom}
              onChange={handleChange}
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
            {formErrors.prenom && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formErrors.prenom}
              </p>
            )}
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
              value={formValues.nom}
              onChange={handleChange}
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
            {formErrors.nom && (
              <p style={{ color: "red", fontSize: "12px" }}>{formErrors.nom}</p>
            )}
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
              value={formValues.email}
              onChange={handleChange}
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
            {formErrors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formErrors.email}
              </p>
            )}
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
              value={formValues.telephone}
              onChange={handleChange}
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
            {formErrors.telephone && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formErrors.telephone}
              </p>
            )}
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
              type="date"
              value={formValues.dateDuMariage}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "4px",
              }}
            />
            {formErrors.dateDuMariage && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formErrors.dateDuMariage}
              </p>
            )}
          </div>

          <p style={{ fontSize: "12px", color: "#555" }}>
            En vous inscrivant, vous confirmez que vous avez lu et accepté notre
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "ENVOYER"}
          </button>
          {submissionMessage && (
            <p
              style={{
                color: submissionMessage.startsWith("Erreur") ? "red" : "green",
                fontSize: "12px",
              }}
            >
              {submissionMessage}
            </p>
          )}
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
