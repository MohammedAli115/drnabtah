
import React from "react";
import { t } from "i18next";
import SectionTitle from "./SectionTitle";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import i18n from "../i18n";

function Shipping() {
  const isArabic = i18n.language === "ar";
  return (
    <section
      className="container py-2"
      style={{
        // background: "linear-gradient(135deg, #e9f8f7, #ffffff)",
        borderRadius: "16px",
        boxShadow: "0 4px 10px #00000033",
        margin: "100px auto",
      }}
    >
      <div className="row align-items-center">
        <div className="col-12 mb-1">
          <SectionTitle text={t("shippingPolicy.title")} />
        </div>

        {/* Image */}
        <div className="col-lg-6 col-sm-12 mb-4 mb-lg-0 text-center">
          <motion.img
            src="/images/shipping.jpg"
            alt="shipping"
            className="img-fluid rounded"
            loading="lazy"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>

        {/* Text */}
        <div
          className="col-lg-6 col-sm-12 fs-5"
          style={{ color: "#333", lineHeight: "1.8" }}
        >
          <p>{t("shippingPolicy.details")}</p>
          <p>{t("shippingPolicy.note")}</p>
          <Link
            to="/contact"
            className="btn btn-lg mt-2 px-4"
            style={{ backgroundColor: "#1bd3c6ff", color: "#fff" }}
          >
            {isArabic ? "تواصلي معنا" : "Contact Us"}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Shipping;
