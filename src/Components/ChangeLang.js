import React from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import "../i18n";

function BtnChangLang() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn border-0 p-0 m-0"
      style={{ background: "none" }}
      aria-label="Toggle Language"
    >
      <FiGlobe size={30} color="#60d8d2" />
    </button>
  );
}

export default BtnChangLang;

