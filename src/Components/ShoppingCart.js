import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ show, handleClose }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className={`position-fixed top-0 bg-white pt-5 shadow p-3 h-100 overflow-auto`}
      style={{
        width: "320px",
        transition: "all 0.3s ease-in-out",
        zIndex: 1050,
        [isArabic ? "right" : "left"]: 0,
        transform: show
          ? "translateX(0)"
          : `translateY(${isArabic ? "-100%" : "100%"})`,
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="d-flex pt-5 justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="m-0">🛒 سلة الشراء</h5>
        <button className="btn btn-sm btn-outline-danger" onClick={handleClose}>
          × إغلاق
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-muted">السلة فارغة</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-3 border-bottom pb-2">
              <p className="fw-bold mb-1">{item.title}</p>
              <p className="text-muted m-0">
                السعر: ${item.price} × {item.quantity} = $
                {item.price * item.quantity}
              </p>

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  🗑 حذف
                </button>
              </div>
            </div>
          ))}
          <hr />
          <button
            className="btn btn-success w-100"
            onClick={() => navigate("/checkout")}
          >
            إتمام عمليه الشراء
          </button>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>الإجمالي:</strong>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
