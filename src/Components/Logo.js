import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div>
      <Link className="navbar-brand fw-bold" to="/">
        <img src="/images/nabtah.png" style={{ width: "100px" }} alt="logo" />
      </Link>
    </div>
  );
}

export default Logo;
