import React from "react";

function ContactIcons() {
  const baseStyle = {
    fontSize: "1.5rem",
    color: "#555",
    transition: "all 0.3s",
    cursor: "pointer",
  };

  const platformColors = {
    facebook: "#1877f2",
    instagram: "#E1306C",
    tiktok: "#000",
    whatsapp: "#25D366",
  };

  const handleMouseEnter = (e, platform) => {
    e.target.style.color = platformColors[platform];
    e.target.style.transform = "scale(1.2)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = baseStyle.color;
    e.target.style.transform = "scale(1)";
  };

  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap">
      <a
        href="https://www.facebook.com/share/16mPZR3jRU/?mibextid=wwXIfr"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-facebook"
          style={baseStyle}
          onMouseEnter={(e) => handleMouseEnter(e, "facebook")}
          onMouseLeave={handleMouseLeave}
        ></i>
      </a>

      <a
        href="https://www.instagram.com/nabtahcosmetics?igsh=YWJwYWp4aTFzdW80&utm_source=qr"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-square-instagram"
          style={baseStyle}
          onMouseEnter={(e) => handleMouseEnter(e, "instagram")}
          onMouseLeave={handleMouseLeave}
        ></i>
      </a>

      <a
        href="https://www.tiktok.com/@nabtah.cosmetics?_t=ZS-8yQimvD0LTB&_r=1"
        target="_blank"
        rel="noreferrer"
      >
        <i
          className="fa-brands fa-tiktok"
          style={baseStyle}
          onMouseEnter={(e) => handleMouseEnter(e, "tiktok")}
          onMouseLeave={handleMouseLeave}
        ></i>
      </a>

      <a href="https://wa.me/201023796892" target="_blank" rel="noreferrer">
        <i
          className="fa-brands fa-square-whatsapp"
          style={baseStyle}
          onMouseEnter={(e) => handleMouseEnter(e, "whatsapp")}
          onMouseLeave={handleMouseLeave}
        ></i>
      </a>
    </div>
  );
}

export default ContactIcons;
