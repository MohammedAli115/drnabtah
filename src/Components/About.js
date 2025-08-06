import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div
        className="container py-5"
        style={{
          borderRadius: "16px",
          boxShadow: "0 4px 10px #00000033",
          margin: "100px auto",
        }}
      >
        <SectionTitle text={t("about.title")} />

        <div className="row align-items-center flex-column-reverse flex-lg-row">
          {/* النص */}
          <div className="col-lg-6 mb-4 mb-lg-0 fs-5">
            <motion.p
              style={{ color: "#000", lineHeight: "30px" }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              {t("about.description")}
            </motion.p>
            <Link
              to="/products"
              className="btn btn-lg mt-3"
              style={{ backgroundColor: "#60d8d2", color: "white" }}
            >
              {t("about.button")}
            </Link>
          </div>

          {/* الصورة */}
          <div className="col-lg-6 text-center">
            <motion.img
              loading="lazy"
              src="/images/About.png"
              alt={t("about.title")}
              className="img-fluid rounded"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
