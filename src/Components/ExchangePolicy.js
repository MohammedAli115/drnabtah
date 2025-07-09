import React from "react";
import { useTranslation } from "react-i18next";

const ExchangePolicy = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const textStyle = {
    color: "#2a445e",
    lineHeight: "2",
    fontSize: "1.1rem"
  };

  return (
    <div className="container my-5 py-5">
      {/* العنوان */}
      <div
        className="text-center mb-5"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <h2
          className="position-relative d-inline-block"
          style={{
            color: "#60d8d2",
            fontSize: "2.5rem",
            fontWeight: "700"
          }}
        >
          {t("exchangePolicy.title")}
          <span
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: "4px",
              backgroundColor: "#60d8d2",
              borderRadius: "2px"
            }}
          ></span>
        </h2>
      </div>

      {/* النص والصورة - ينعكسوا في الشاشات الصغيرة */}
      <div
        className="row align-items-center flex-column-reverse flex-md-row"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <div className="col-md-6 mt-4 mt-md-0">
          <p style={textStyle}>{t("exchangePolicy.paragraph1")}</p>
          <p style={textStyle}>{t("exchangePolicy.paragraph2")}</p>
          <ul style={textStyle}>
            <li>{t("exchangePolicy.bullet1")}</li>
            <li>{t("exchangePolicy.bullet2")}</li>
            <li>{t("exchangePolicy.bullet3")}</li>
          </ul>
          <p style={textStyle}>{t("exchangePolicy.end")}</p>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="/images/retun.jpg"
            alt="Exchange Policy"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangePolicy;
