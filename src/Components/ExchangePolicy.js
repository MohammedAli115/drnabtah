import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ExchangePolicy = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className="container py-3"
      style={{
        margin: "100px auto 30px",
        borderRadius: "16px",
        boxShadow: "0 4px 10px #00000033",
      }}
    >
      <div className="text-center mb-5">
        <h2
          className="position-relative d-inline-block"
          style={{
            color: "#60d8d2",
            fontSize: "2.5rem",
            fontWeight: "700",
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
              borderRadius: "2px",
            }}
          ></span>
        </h2>
      </div>

      <div
        className="row align-items-center flex-column-reverse flex-md-row"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <div
          className="col-md-6 mt-4 mt-md-0 fs-5"
          style={{ color: "#2a445e", lineHeight: "2" }}
        >
          <p>{t("exchangePolicy.paragraph1")}</p>
          <p>{t("exchangePolicy.paragraph2")}</p>
          <ul>
            <li>{t("exchangePolicy.bullet1")}</li>
            <li>{t("exchangePolicy.bullet2")}</li>
            <li>{t("exchangePolicy.bullet3")}</li>
          </ul>
          <p>{t("exchangePolicy.end")}</p>
          <Link
            to="/contact"
            className="btn btn-lg mt-1 px-4"
            style={{ backgroundColor: "#1bd3c6ff", color: "#fff" }}
          >
            {isArabic ? "تواصلي معنا" : "Contact Us"}
          </Link>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="/images/retun.jpg"
            alt="Exchange Policy"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangePolicy;
