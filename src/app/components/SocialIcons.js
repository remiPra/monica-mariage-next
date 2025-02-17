import React from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaPhone,
} from "react-icons/fa";

const SocialIcons = ({ center }) => {
  const iconColor = "white";
  // const iconColor = "#AF7749";
  const iconSize = 30;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: center,
        gap: "20px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <a
        href="https://wa.me/votre_numero"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        <FaWhatsapp size={iconSize} color={iconColor} />
      </a>
      <a
        href="https://www.instagram.com/votre_profil"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={iconSize} color={iconColor} />
      </a>
      <a
        href="https://m.me/votre_profil"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookMessenger size={iconSize} color={iconColor} />
      </a>
      <a href="tel:votre_numero">
        <FaPhone size={iconSize} color={iconColor} />
      </a>
    </div>
  );
};

export default SocialIcons;
