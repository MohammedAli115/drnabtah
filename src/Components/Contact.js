import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContactForm.module.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import SectionTitle from "./SectionTitle";

function Contact() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="container" style={{ marginBlock: "100px" }}>
      <SectionTitle text={t("contact.title")} />

      {/* النص والفورم جنب بعض */}
      <div
        className="row align-items-center g-5 flex-column flex-md-row"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <div className="col-md-6">
          <h4 style={{ lineHeight: "55px" }}>{t("contact.header_line1")}</h4>
          <p className="mt-3" style={{ maxWidth: "500px" }}>
            {t("contact.header_line2")}
          </p>
        </div>

        <div className="col-md-6">
          <form className={`${styles.form_main}`}>
            <div className={styles.inputContainer}>
              <input
                type="number"
                className={styles.inputField}
                placeholder={t("contact.phone_placeholder")}
              />
            </div>

            <div className={styles.inputContainer}>
              <textarea
                className={styles.inputField}
                rows="4"
                placeholder={t("contact.message_placeholder")}
              ></textarea>
            </div>

            <button className={styles.button} type="submit">
              {t("contact.submit")}
            </button>
          </form>
        </div>
      </div>

      {/* الايقونات تحت وحدها */}
      <div
        className="d-flex flex-column fs-3 flex-md-row justify-content-center align-items-center gap-4 mt-5"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <p className="d-flex align-items-center gap-2 mb-0">
          <FaEnvelope color="#000" />
        </p>
        <p className="d-flex align-items-center gap-2 mb-0">
          <FaPhoneAlt color="#000" />
        </p>
        <p className="d-flex align-items-center gap-2 mb-0">
          <FaWhatsapp color="#000" />
        </p>
        <p className="d-flex align-items-center gap-2 mb-0">
          <FaInstagram color="#000" />
        </p>
      </div>
    </div>
  );
}

export default Contact;
