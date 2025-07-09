import { t } from "i18next";
import React from "react";
import SectionTitle from "./SectionTitle";

function Shipping() {
  return (
    <div className="container mt-5 py-5">
      <div className="row align-items-center">
        <SectionTitle text={t("shippingPolicy.title")} />

        <div className="col-lg-6 col-sm-12">
          <img
            src="/images/shipping.jpg"
            style={{ maxWidth: "100%" }}
            loading="lazy"
            alt="shipping"
          />
        </div>
        <div className="col-lg-6 col-sm-12 fs-4">
          <p>{t("shippingPolicy.details")}</p>
          <p>{t("shippingPolicy.note")}</p>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
