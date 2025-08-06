
import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import {
  addItemToCart,
  removeItemFromCart,
  fetchCart,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Wishlist = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({});

  const cartItems = useSelector((state) => state.cart.data?.items || []);
  const favorites = useSelector((state) => state.favorites);

  const isArabic = i18n.language === "ar";
  const currency = { symbol: "EGP", lang: isArabic ? "ar" : "en" };

  const showToast = useCallback((icon, title, text, timer = 2000) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      text,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
  }, []);

  // const handleToggleCart = useCallback(
  //   async (product) => {
  //     setLoadingStates((prev) => ({ ...prev, [product.id]: true }));
      
  //     try {
  //       const isInCart = cartItems.some((item) => item.product.id === product.id);

  //       if (isInCart) {
  //         await dispatch(removeItemFromCart(product.id));
  //         await dispatch(fetchCart());
  //         showToast("info", t("alerts.removed"), t("alerts.product_removed"));
  //       } else {
  //         await dispatch(addItemToCart({ product, quantity: 1 }));
  //         await dispatch(fetchCart());
  //         showToast("success", t("alerts.added"), t("alerts.product_added"));
  //       }
  //     } catch (error) {
  //       console.error("Cart error:", error);
  //       showToast("error", t("alerts.error"), t("alerts.cart_error"), 3000);
  //     } finally {
  //       setLoadingStates((prev) => ({ ...prev, [product.id]: false }));
  //     }
  //   },
  //   [cartItems, dispatch, showToast, t]
  // );
const handleToggleCart = useCallback(
  async (product) => {
    setLoadingStates((prev) => ({ ...prev, [product.id]: true }));

    try {
      const isInCart = cartItems.some((item) => item.product.id === product.id);

      if (isInCart) {
        const itemInCart = cartItems.find((item) => item.product.id === product.id);
        if (!itemInCart) return;
        await dispatch(removeItemFromCart({ itemId: itemInCart.id }));
        await dispatch(fetchCart());
        showToast("info", t("alerts.removed"), t("alerts.product_removed"));
      } else {
        await dispatch(addItemToCart({ productId: product.id, quantity: 1 }));
        await dispatch(fetchCart());
        showToast("success", t("alerts.added"), t("alerts.product_added"));
      }
    } catch (error) {
      console.error("Cart error:", error);
      showToast("error", t("alerts.error"), t("alerts.cart_error"), 3000);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [product.id]: false }));
    }
  },
  [cartItems, dispatch, showToast, t]
);

  const onToggleFavorite = useCallback(
    (product) => {
      dispatch(toggleFavorite(product));
    },
    [dispatch]
  );

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container mt-5 py-5">
        <p className="text-center fs-1 my-5 py-5 text-danger">
          {t("wishlist.empty")}
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5 py-5">
      <h2 className="text-center mb-4 fs-1" style={{ color: "#1dd2cfff" }}>
        {t("wishlist.title")}
      </h2>

      <div className="row">
        {favorites.map((product, index) => {
          const isInCart = cartItems.some((item) => item.product.id === product.id);
          const isLoading = loadingStates[product.id] || false;

          return (
            <motion.div
              key={product.id}
              className="col-lg-3 col-md-6 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className="card h-100 overflow-hidden border-0 position-relative"
                style={{
                  boxShadow: "0 2px 10px #00000013",
                  backgroundColor: "#d3fafc31",
                }}
              >
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt={isArabic ? product.name_ar : product.name_en}
                  style={{ height: "200px", objectFit: "contain" }}
                  loading="lazy"
                />

                <div className="card-body text-center">
                  <h5 className="fw-bold">
                    {isArabic ? product.name_ar : product.name_en}
                  </h5>

                  <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                    {product.price_after_discount < product.price && (
                      <span className="text-muted text-decoration-line-through">
                        {product.price} {currency.symbol}
                      </span>
                    )}
                    <span className="fw-bold text-dark fs-6">
                      {product.price_after_discount} {currency.symbol}
                    </span>
                  </div>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm rounded-3"
                      style={{
                        backgroundColor: "#ffffffff",
                        color: isInCart ? "#f36219ff" : "#19cbf3ff",
                      }}
                      onClick={() => handleToggleCart(product)}
                      disabled={isLoading}
                      title={
                        isInCart
                          ? t("wishlist.remove_from_cart")
                          : t("wishlist.add_to_cart")
                      }
                    >
                      {isLoading ? (
                        <span className="spinner-border spinner-border-sm" />
                      ) : isInCart ? (
                        <i className="fa-solid fa-trash-can-arrow-up"></i>
                      ) : (
                        <i className="fa-solid fa-cart-plus"></i>
                      )}
                    </button>

                    <button
                      className="btn btn-sm rounded-3"
                      style={{ backgroundColor: "#ffffffff", color: "#ff0000" }}
                      onClick={() => onToggleFavorite(product)}
                      title={t("wishlist.remove_from_wishlist")}
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>

                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-sm rounded-3"
                      style={{ backgroundColor: "#ffffffff", color: "#3b727eff" }}
                      title={t("wishlist.view_product")}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;