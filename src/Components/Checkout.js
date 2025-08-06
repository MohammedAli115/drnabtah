import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  updateCartItem,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import CitiesSelect from "./CitiesSelect";
import Swal from "sweetalert2";
import api from "./../api/axios";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items, total, grandTotal } = useSelector((state) => state.cart.data);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [whatsappNum, setWhatsappNum] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && (!items || items.length === 0)) {
      navigate("/products");
    }
  }, [loading, items, navigate]);

  const formatPrice = (value) => `${Number(value).toFixed(2)} EGP`;

  const handleQuantityChange = (item, change) => {
    const newQty = item.quantity + change;
    if (newQty < 1) return;
    dispatch(updateCartItem({ itemId: item.id, quantity: newQty }));
  };

  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: t("checkout.confirmDeleteTitle"),
      text: t("checkout.confirmDeleteText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("checkout.confirm"),
      cancelButtonText: t("checkout.cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItemFromCart({ itemId }));
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post("/addresses", {
        phone,
        address,
        city_id: selectedCityId,
        is_default: 1,
      });
      const newAddress = response.data.data;
      setAddressId(newAddress.id);
      localStorage.setItem("name", name);
      localStorage.setItem("whatsappNum", whatsappNum);

      Swal.fire({
        icon: "success",
        title: t("checkout.successTitle"),
        timer: 1000,
        showConfirmButton: false,
      });

      navigate("/order", {
        state: {
          cart: { items, total, grandTotal },
          address: { ...newAddress, phone, address },
          city: selectedCity,
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: t("checkout.errorTitle"),
        text: t("checkout.errorText"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container my-5 py-5"
      style={{ background: "linear-gradient(135deg, #ffffffff, #dff3f5)" }}
    >
      <h2 className="mb-5 text-center fw-bold">{t("checkout.title")}</h2>

      <div
        className="row g-4 flex-column flex-lg-row"
        style={{ minHeight: "80vh" }}
      >
        {/* ✅ الفورم - يظهر فوق في الشاشات الصغيرة */}
        <div className="col-lg-6 order-1 order-lg-2">
          <div
            style={{
              // maxHeight: "75vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            <form className="" onSubmit={handleSubmit}>
              <h6 className="mb-3 fs-3 fw-bold">
                {t("checkout.shippingAddress")}
              </h6>

              <div className="mb-3">
                <label className="form-label">{t("checkout.name")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("checkout.phone")}</label>
                <input
                  type="number"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("checkout.whatsapp")}</label>
                <input
                  type="number"
                  className="form-control"
                  value={whatsappNum}
                  onChange={(e) => setWhatsappNum(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">{t("checkout.address")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <CitiesSelect
                selectedCity={selectedCityId}
                onChange={(id, cityObj) => {
                  setSelectedCityId(id);
                  setSelectedCity(cityObj);
                }}
              />

              <button
                type="submit"
                className="btn fs-4 rounded py-2 border-0 w-100 mt-3"
                style={{ backgroundColor: "#b5dae0ff", color: "#000" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("checkout.submitting") : t("checkout.submit")}
              </button>
            </form>
          </div>
        </div>

        {/* ✅ المنتجات */}
        <div className="col-lg-6 order-2 order-lg-1">
          <div
            style={{
              // maxHeight: "75vh",
              // overflowY: "auto",
              paddingRight: "10px",
            }}
          >
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" />
                <p className="mt-3 text-muted">{t("checkout.loading")}</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">
                {t("checkout.error")}
              </div>
            ) : (
              <>
                {items?.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between shadow-sm p-3 rounded mb-3 bg-white"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.product?.image_url || "/placeholder.png"}
                        alt={item.product?.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <div>
                        <div className="fw-semibold">{item.product?.name}</div>
                        <div className="text-muted small">
                          {item.price} {t("checkout.each")}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="fw-bold text-success">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                ))}

                <div className="shadow-sm p-4 rounded bg-white">
                  <h5 className="mb-3 fw-bold">{t("checkout.orderSummary")}</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>{t("checkout.subtotal")}:</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>{t("checkout.shipping")}:</span>
                    <span>
                      {formatPrice(selectedCity?.shipping_price || 0)}
                    </span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>{t("checkout.total")}:</span>
                    <span className="text-success">
                      {formatPrice(
                        Number(total || 0) +
                          Number(selectedCity?.shipping_price || 0)
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
