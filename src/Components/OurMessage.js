import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const OurMessage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section
      className="container py-3"
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 10px #00000033",
        margin: "100px auto",
      }}
    >
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6 mb-4">
          <h2 className="mb-4 fw-bold" style={{ color: "#1bd3c6ff" }}>
            {isArabic ? "رسالتنا" : "Our Message"}
          </h2>
          <p
            className="fs-5"
            style={{ lineHeight: "1.8", color: "#333", whiteSpace: "pre-line" }}
          >
            {isArabic
              ? `أن نمنحكِ منتجًا طبيعيًا “موثوقًا”، يراعي بشرتك، شعرك، وجسمك، كما تستحقين.
منتجات NABTAH ليست مجرد عناية، بل تجربة علاجية متكاملة، موجهة للمرأة التي تبحث عن الجودة، وتفهم الفرق بين منتج عابر… وتركيبة تُحدث فرقًا.`
              : `To offer you a trustworthy natural product that respects your skin, hair, and body — just as you deserve.
NABTAH products aren’t just skincare, but a complete therapeutic experience for women who value quality and understand the difference between a random product and a formula that makes a real difference.`}
          </p>
          <Link
            to="/contact"
            className="btn btn-lg mt-4 px-4"
            style={{ backgroundColor: "#1bd3c6ff", color: "#fff" }}
          >
            {isArabic ? "تواصلي معنا" : "Contact Us"}
          </Link>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <motion.img
            src="/images/message.png" // ضع الصورة في public/images أو غيّر المسار
            alt="Our Message"
            className="img-fluid rounded"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default OurMessage;
