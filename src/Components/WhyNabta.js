import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const WhyNabta = () => {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const features = t("whyNabta.features", { returnObjects: true });

  return (
    <section
      className="container py-3"
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 10px #00000033",
        margin: "100px auto",
      }}
    >
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6 mb-4">
          <h2 className="mb-4 fw-bold" style={{ color: "#1bd3c6ff" }}>
            {t("whyNabta.title")}
          </h2>
          <ul className="fs-5" style={{ lineHeight: "1.8", color: "#333" }}>
            {features.map((item, index) => (
              <li key={index} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center mb-4">
          <motion.img
            src="/images/whatNabtah.png" 
            alt={t("whyNabta.title")}
            className="img-fluid rounded"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyNabta;
