import React from "react";

const SectionTitle = ({ text, color = "#60d8d2" }) => {
  return (
    <h2
      className="position-relative text-center mb-5"
      style={{
        color: color,
        fontSize: "2.5rem",
        fontWeight: "700",
      }}
    >
      {text}
      <span
        style={{
          position: "absolute",
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "10%",
          height: "2px",
          backgroundColor: color,
          borderRadius: "2px",
        }}
      ></span>
    </h2>
  );
};

export default SectionTitle;
