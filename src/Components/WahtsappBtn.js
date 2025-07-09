import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

function WhatsappBtn() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [showText, setShowText] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(true);
      const timeout = setTimeout(() => {
        setShowText(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const shouldShowText = showText || hovering;

  return (
    <motion.div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="position-fixed d-flex align-items-center rounded-pill shadow"
      style={{
        zIndex: 999999,
        cursor: "pointer",
        bottom: "1rem",
        [isArabic ? "right" : "left"]: "1rem",
        backgroundColor: shouldShowText ? "#abfeec" : "abfeec",
        border:  "1px solid #ccc",
        padding: shouldShowText? "0.2rem 1rem" : "0.2rem 0.2rem",
        overflow: "hidden"
      }}
    >
      <AnimatePresence mode="wait">
        {shouldShowText && (
          <motion.span
            key="text"
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
            transition={{ duration: 0.6 }}
            style={{
              whiteSpace: "nowrap",
              direction: isArabic ? "rtl" : "ltr",
              marginInline: "0.5rem"
            }}
          >
            {t("whatsapp.contact")}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: shouldShowText ? 0 : 1, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: [1, 0.95, 1],
          rotate: [0, 2, -2, 0],
          x: shouldShowText ? (isArabic ? -5 : 5) : 0
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          },
          x: {
            type: "spring",
            stiffness: 300
          }
        }}
        style={{
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          padding: "8px",
          boxShadow:  "0 0 8px #15f3b1"
        }}
      >
        <FaWhatsapp size={26} />
      </motion.div>
    </motion.div>
  );
}

export default WhatsappBtn;
