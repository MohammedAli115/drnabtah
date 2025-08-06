import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      className="hero d-flex align-items-center py-3"
      style={{
        backgroundImage: `url(/images/herobg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.3 }}
    >
      <div className="container py-5 my-2 mt-lg-2">
        <div className="row align-items-center justify-content-center mt-3">
          {/* IMG SLIDER */}
          <motion.div
            className="col-lg-6 order-1 order-lg-2 text-start mt-lg-5"
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div style={{ height: "400px" }}>
              <motion.img
                src="../../images/heroo.png"
                transition={{ duration: 0.8 }}
                className="rounded -absolute w-100 h-100"
                style={{ objectFit: "cover" }}
                loading="eager"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            className={`col-lg-6 order-2 order-lg-1 mt-5 mt-lg-0 ${
              i18n.language === "ar"
                ? "text-center text-lg-end"
                : "text-center text-lg-start"
            }`}
            // variants={textVariant}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-4 fs-2">{t("hero.title")}</h3>
            <p className="mb-4 fs-4">{t("hero.subtitle")}</p>
            <div className="icons-cart-like d-flex justify-content-center justify-content-lg-start gap-3">
              <Link
                to="/products"
                className="btn btn-lg"
                style={{ backgroundColor: "#000", color: "white" }}
              >
                {t("hero.shopNow")}
              </Link>
              <Link to="/contact" className="btn btn-lg btn-outline-dark">
                {t("hero.contactUs")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
