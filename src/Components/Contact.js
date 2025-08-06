import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContactForm.module.css";
import SectionTitle from "./SectionTitle";
import ContactIcons from "./ContactIcons";

function Contact() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "201023796892";
    const text = `رقم الهاتف: ${phone}%0Aالرسالة: ${message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div
      className="container pt-3"
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 10px #00000033",
        margin: "100px auto",
      }}
    >
      <SectionTitle text={t("contact.title")} />

      <div className="row align-items-center g-5 flex-column flex-md-row py-3">
        <div className="col-md-6">
          <h4 style={{ lineHeight: "59px" }}>{t("contact.header_line1")}</h4>
          <p className="mt-3" style={{ maxWidth: "500px" }}>
            {t("contact.header_line2")}
          </p>
          <div
            className="d-flex flex-column fs-3 flex-md-row justify-content-center align-items-center gap-4 mt-5"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <ContactIcons />
          </div>
        </div>

        <div className="col-md-6">
          <form className={styles.form_main} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <input
                type="number"
                className={styles.inputField}
                placeholder={t("contact.phone_placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputContainer}>
              <textarea
                className={styles.inputField}
                rows="4"
                placeholder={t("contact.message_placeholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button className={styles.button} type="submit">
              {t("contact.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
