import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "./Logo";

function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      style={{
        backgroundImage: `url("/images/bg/${
          isArabic ? "bg-ar.png" : "bg-en.png"
        }")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 0 10px #94c6c4",
      }}
    >
      <div className="container fs-4  ">
        <div className="row py-3">
          {/* Logo */}
          <div className="col-12 text-center ol-md-3 col-lg-2 mb-4">
            <Logo />
          </div>

          {/* Links Column 1 */}
          <div className="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column">
            <Link to="/about" className="text-dark text-decoration-none mb-2">
              {t("footer.about")}
            </Link>
            <Link
              to="/products"
              className="text-dark text-decoration-none mb-2"
            >
              {t("footer.products")}
            </Link>
            <Link to="/contact" className="text-dark text-decoration-none mb-2">
              {t("footer.contact")}
            </Link>
            <Link to="/reviews" className="text-dark text-decoration-none mb-2">
              {t("footer.reviews")}
            </Link>
          </div>

          {/* Links Column 2 */}
          <div className="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column">
            <Link
              to="/shipping"
              className="text-dark text-decoration-none mb-2"
            >
              {t("footer.shippingPolicy")}
            </Link>
            <Link to="/exchangePolicy" className="text-dark text-decoration-none mb-2">
              {t("footer.returns")}
            </Link>
            <Link to="/support" className="text-dark text-decoration-none mb-2">
              {t("footer.customerService")}
            </Link>
            <Link to="/mission" className="text-dark text-decoration-none mb-2">
              {t("footer.mission")}
            </Link>
          </div>

          {/* Links Column 3 */}
          <div className="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column">
            <Link to="/vision" className="text-dark text-decoration-none mb-2">
              {t("footer.vision")}
            </Link>
            <Link
              to="/why-nabta"
              className="text-dark text-decoration-none mb-2"
            >
              {t("footer.whyNabta")}
            </Link>
            <Link to="/promise" className="text-dark text-decoration-none mb-2">
              {t("footer.ourPromise")}
            </Link>
            <Link to="/sales" className="text-dark text-decoration-none mb-2">
              {t("footer.sales")}
            </Link>
          </div>

          {/* Links Column 4 */}
          <div className="col-6 col-md-3 col-lg-2 mb-4 d-flex flex-column">
            <Link
              to="/customer-service"
              className="text-dark text-decoration-none mb-2"
            >
              {/* {t("footer.customerSupport")} */}
            </Link>
            <Link
              to="/manufacturing"
              className="text-dark text-decoration-none mb-2"
            >
              {t("footer.manufacturing")}
            </Link>
            <Link to="/offers" className="text-dark text-decoration-none mb-2">
              {t("footer.offers")}
            </Link>
            <Link
              to="/executive"
              className="text-dark text-decoration-none mb-2"
            >
              {t("footer.executiveManagement")}
            </Link>
          </div>

          {/* Social Icons - Now takes full width on mobile */}
          <div className="col-12 col-md-3 col-lg-2 mb-4 d-flex gap-3 justify-content-center justify-content-md-start">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="text-dark fs-4"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-dark fs-4"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-dark fs-4"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div
        className="text-center text-dark py-3"
        dir={isArabic ? "rtl" : "ltr"}
        style={{ borderTop: "2px solid #ffff" }}
      >
        {t("footer.rights")}
      </div>
    </div>
  );
}

export default Footer;
