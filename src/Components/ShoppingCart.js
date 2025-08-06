import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const ShoppingCart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { items, total, count, discount, shipping, grandTotal } = useSelector(
    (state) => state.cart.data
  );
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    if (show) {
      dispatch(fetchCart());
    }
  }, [dispatch, show]);

  const handleUpdateQuantity = (item, change) => {
    const newQty = item.quantity + change;
    if (newQty >= 1) {
      dispatch(updateCartItem({ itemId: item.id, quantity: newQty }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart({ itemId }));
  };

  return (
    <div
      className="position-fixed top-0 start-0 bg-white pt-5 mt-5 shadow h-100 overflow-auto"
      style={{
        width: "300px",
        transition: "all 0.2s",
        zIndex: 1050,
        [isArabic ? "right" : "left"]: 0,
        transform: show
          ? "translateX(0)"
          : `translateX(${isArabic ? "100%" : "-100%"})`,
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="d-flex  justify-content-between align-items-center border-bottom pb-2 mb-3 px-3">
        <h4 className="m-0">🛒 {t("cart.title", "Shopping Cart")}</h4>
        <button className="btn btn-sm btn-outline-dark" onClick={handleClose}>
          <FiX />
        </button>
      </div>

      <div className="px-3">
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-info" role="status" />
            <p className="mt-2">{t("cart.loading", "Loading...")}</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            {t("cart.loadError", "Failed to load cart")}
          </div>
        )}

        {!loading && !error && items?.length === 0 && (
          <div className="text-center my-5">
            <img
              src="/images/cartEmpty.png"
              alt="Empty Cart"
              style={{ maxWidth: "150px" }}
              className="mb-3"
            />
            <p className="text-muted">
              {t("cart.empty", "Your cart is empty")}
            </p>
            <Link
              to="/products"
              className="btn btn-outline-info mt-2"
              onClick={handleClose}
            >
              {t("cart.browse", "Browse Products")}
            </Link>
          </div>
        )}

        {!loading && !error && items?.length > 0 && (
          <>
            <AnimatePresence>
              <motion.div
                className=""
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.02 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    style={{ background: "#f1f6f8ff" }}
                    className="d-flex align-items-center border-bottom flex-column  py-3 my-1"
                  >
                    <div className="d-flex align-items-center justify-content-between w-100 text-center">
                      <img
                        src={item.product?.image_url || "/placeholder.png"}
                        alt={item.product?.name_ar}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        className="mx-2"
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold">
                          {item.product?.name_ar}
                        </div>
                      </div>
                      <div className="ms-2 text-success fw-bold">
                        {item.total_price} {t("cart.currency", "EGP")}
                      </div>
                      <button
                        className="btn btn-sm fs-6 btn-link text-danger ms-1"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FiTrash />
                      </button>
                    </div>
                    <div className="d-flex align-items-center mt-1 "
                    style={{background :"#f4fbfdff", padding: "5px 10px", borderRadius: "8px"}}>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        disabled={item.quantity <= 1}
                        onClick={() => handleUpdateQuantity(item, -1)}
                      >
                        <FiMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleUpdateQuantity(item, 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="border-top pt-3 my-3 pb-5">
              <div className="d-flex justify-content-between fw-bold text-success mb-2">
                <span>{t("cart.total", "Total")}:</span>
                <span>
                  {grandTotal} {t("cart.currency", "EGP")}
                </span>
              </div>
              <div className="d-grid gap-2 mt-3">
                <Link
                  to="/checkout"
                  className="btn"
                  onClick={handleClose}
                  style={{ backgroundColor: "#58bed0ff", color: "#fff" }}
                >
                  {t("cart.checkout", "Proceed to Checkout")}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
