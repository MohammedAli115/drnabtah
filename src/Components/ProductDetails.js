import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../features/cart/cartSlice";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { id } = useParams();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.data.items || []);
  const product = items.find((p) => p.id.toString() === id.toString());

  const inCart = cartItems.some(
    (item) =>
      item.product_id === product?.id ||
      item.product?.id === product?.id ||
      item.id === product?.id
  );

  if (!product)
    return (
      <div className="container py-5 mt-5 text-center">
        <h4 className="text-danger">{t("productDetails.not_found")}</h4>
      </div>
    );

  return (
    <motion.div
      className="container p-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        borderRadius: "20px",
        margin: "100px auto",
        boxShadow: "0 0 10px #0a9d9156",
      }}
    >
      <div className="row align-items-center">
        <div className="col-md-6">
          <h3 className="mb-3 fs-1">
            {isArabic ? product.name_ar : product.name_en}
          </h3>

          <p className="mb-3">
            <span className="text-muted text-decoration-line-through fs-4 mx-2">
              {product.price} {isArabic ? "ج.م" : "EGP"}
            </span>
            <span className="fw-bold fs-3 text-info mx-2">
              {product.price_after_discount} {isArabic ? "ج.م" : "EGP"}
            </span>
          </p>

          <p className="mb-4 fs-4 text-secondary" style={{ lineHeight: "1.7" }}>
            {isArabic ? product.description_ar : product.description_en}
          </p>

          <div className="d-flex flex-wrap gap-3">
            <button
              className={`btn ${
                inCart ? "btn-outline-secondary" : "btn-info text-white"
              } px-4 py-2 fw-bold rounded-pill`}
              onClick={() =>
                inCart
                  ? dispatch(removeItemFromCart({ itemId: product.id }))
                  : dispatch(addItemToCart({ productId: product.id }))
              }
              disabled={inCart}
            >
              {inCart
                ? t("productDetails.in_cart") || "✔️ في السلة"
                : t("productDetails.add_to_cart") || "أضف للسلة"}
            </button>

            <Link
              to={inCart ? "/checkout" : "#"}
              className={`btn px-4 py-2 fw-bold rounded-pill ${
                inCart ? "btn-outline-info " : "btn-outline-secondary disabled"
              }`}
              tabIndex={inCart ? 0 : -1}
            >
              {inCart
                ? t("productDetails.checkout") || "إتمام الشراء"
                : t("productDetails.add_first") || "أضف للسلة أولاً"}
            </Link>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <motion.img
            src={product.image_url}
            alt={product.name_en}
            className="img-fluid rounded "
            style={{ height: "340px", objectFit: "contain" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
