import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OurPromise = () => {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section
      className="container py-3"
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 10px #00000033",
        margin: "100px auto",
      }}
    >
      <div className="row align-items-center flex-column-reverse flex-md-row">
        {/* Text Section */}
        <div className="col-md-6 mb-4">
          <h2 className="mb-4 fw-bold" style={{ color: "#1bd3c6ff" }}>
            {t("ourPromise.title")}
          </h2>
          <p
            className="fs-5"
            style={{ lineHeight: "1.8", color: "#333", whiteSpace: "pre-line" }}
          >
            {t("ourPromise.content")}
          </p>
          <Link
            to="/products"
            className="btn btn-lg mt-4 px-4 shadow"
            style={{ backgroundColor: "#000", color: "#fff" }}
          >
            {isArabic ? " تسوقي الأن" : " Shop Now"}
          </Link>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center mb-4">
          <motion.img
            src="/images/promise.png"
            alt={t("ourPromise.title")}
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

export default OurPromise;
