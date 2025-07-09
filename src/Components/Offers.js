import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Offers() {
  const { t } = useTranslation();
  return (
    <div className="offers container py-5 text-center">
      <div className="heading">
        <h3 className="mx-5">{t("offers.heading")}</h3>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <img
            src="/images/offers/offer1.png"
            style={{ maxWidth: "100%" }}
            alt="offers"
            className="my-3"
          />
          <Link
            to="/products"
            className="btn  btn-lg"
            style={{
              backgroundColor: "#d4f1f0",
              color: "#000",
              border: "1px solid #ccc",
            }}
          >
            {t("hero.shopNow")}
          </Link>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <img
            src="/images/offers/offer2.png"
            style={{ maxWidth: "100%" }}
            alt="offers"
            className="my-3"
          />
          <Link
            to="/products"
            className="btn  btn-lg"
            style={{
              backgroundColor: "#d4f1f0",
              color: "#000",
              border: "1px solid #ccc",
            }}
          >
            {t("hero.shopNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Offers;
