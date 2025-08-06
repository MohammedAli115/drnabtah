import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BtnChangLang from "./ChangeLang";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiLogOut,
  FiHeart,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import Swal from "sweetalert2";
import Logo from "./Logo";

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const isArabic = i18n.language === "ar";

  const [showCart, setShowCart] = useState(false);
  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const cartItems = useSelector((state) => state.cart.data.items || []);
  const favorites = useSelector((state) => state.favorites);
  useEffect(() => {
    document.documentElement.setAttribute("dir", isArabic ? "rtl" : "ltr");
  }, [i18n.language]);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("session_id");
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    Swal.fire({
      title: t("logout.confirm_title"),
      text: t("logout.confirm_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("logout.confirm_yes"),
      cancelButtonText: t("logout.confirm_cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire({
          icon: "success",
          title: t("logout.success_message"),
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      <nav
        className="navbar fixed-top"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px #94c6c4",
          zIndex: 1051,
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <Logo />
          <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item">
                <Link
                  className={`nav-link fs-4 ${
                    currentPath === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  {t("navbar.home")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fs-4 ${
                    currentPath === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  {t("navbar.about")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fs-4 ${
                    currentPath === "/reviews" ? "active" : ""
                  }`}
                  to="/reviews"
                >
                  {t("navbar.reviews")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fs-4 ${
                    currentPath === "/products" ? "active" : ""
                  }`}
                  to="/products"
                >
                  {t("navbar.products")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fs-4 ${
                    currentPath === "/contact" ? "active" : ""
                  }`}
                  to="/contact"
                >
                  {t("navbar.contact")}
                </Link>
              </li>

            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            <BtnChangLang />

            <div
              className="position-relative"
              style={{ cursor: "pointer" }}
              onClick={handleShowCart}
            >
              <FiShoppingCart size={30} color="#60d8d2" />
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 text-dark start-50 fs-6 translate-middle badge bg-info">
                  {cartItems.length}
                </span>
              )}
            </div>

            <Link
              to="/wishlist"
              className="position-relative"
              style={{ cursor: "pointer" }}
            >
              <FiHeart size={28} color="#60d8d2" />
              {favorites.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                  {favorites.length}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div
                className="d-flex align-items-center gap-1 text-dark"
                style={{ cursor: "pointer" }}
                onClick={handleConfirmLogout}
              >
                <FiLogOut size={30} color="#60d8d2" />
              </div>
            ) : (
              <Link
                to="/login"
                className="d-flex align-items-center gap-1 text-dark"
                style={{ cursor: "pointer" }}
              >
                <FiUser size={30} color="#60d8d2" />
              </Link>
            )}

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ border: "none", background: "transparent" }}
            >
              <FiMenu size={24} color="#60d8ff" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="collapse navbar-collapse d-lg-none px-3 pb-2"
        id="navbarSupportedContent"
        style={{
          backgroundColor: "#eafffe",
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
          position: "fixed",
          top: "66px",
          width: "100%",
          zIndex: 998,
        }}
      >
        <ul className="navbar-nav w-100 py-3">
          <li className="nav-item">
            <Link
              className={`nav-link ${currentPath === "/" ? "active" : ""}`}
              to="/"
            >
              {t("navbar.home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${currentPath === "/about" ? "active" : ""}`}
              to="/about"
            >
              {t("navbar.about")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                currentPath === "/reviews" ? "active" : ""
              }`}
              to="/reviews"
            >
              {t("navbar.reviews")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                currentPath === "/products" ? "active" : ""
              }`}
              to="/products"
            >
              {t("navbar.products")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                currentPath === "/services" ? "active" : ""
              }`}
              to="/services"
            >
              {t("navbar.services")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                currentPath === "/contact" ? "active" : ""
              }`}
              to="/contact"
            >
              {t("navbar.contact")}
            </Link>
          </li>

        </ul>
      </div>

      <ShoppingCart show={showCart} handleClose={handleCloseCart} />

      <style>{`
        .nav-link.active {
          color: #60d8d2 !important;
          font-weight: bold;
          border-bottom: 2px solid #60d8d2;
        }
      `}</style>
    </>
  );
}

export default Navbar;
