import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import { toggleFavorite } from "../features/favorites/favoritesSlice.js";
import { fetchProducts } from "../features/products/productsSlice";
import Loader from "./Loading.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.js";

const ProductCard = memo(
  ({ product, isArabic, isFavorite, onAddToCart, onToggleFavorite, index }) => (
    <motion.div
      className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        className="card w-100 rounded shadow-sm my-3"
        style={{ height: "", display: "flex", flexDirection: "column" }}
      >
        <Link
          to={`/products/${product.id}`}
          className="text-dark text-decoration-none d-flex flex-column h-100"
        >
          <img
            src={product.image}
            className="card-img-top w-100"
            style={{ height: "240px", objectFit: "cover" }}
            alt={product.title}
            loading="lazy"
          />
          <div
            className="card-body text-center flex-grow-1 d-flex flex-column justify-content-between"
            style={{ padding: "1rem" }}
          >
            <h6 className="card-title fw-bold">
              {product.title.length > 40
                ? product.title.substring(0, 40) + "..."
                : product.title}
            </h6>
            <p className="card-text text-muted">
              {/* {isArabic ? product.description : product.description} */}
            </p>
            <div className="d-flex justify-content-center gap-3">
              <p className="mb-0">${product.price}</p>
              {product.price_after_discount && (
                <p className="text-danger mb-0">
                  ${product.price_after_discount}
                </p>
              )}
            </div>
          </div>
        </Link>
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onAddToCart(product)}
          >
            🛒
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onToggleFavorite(product)}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </motion.div>
  )
);

const ProductsList = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.products || {});
  const productsArray = Object.values(items);
  const favorites = useSelector((state) => state.favorites);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = productsArray.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="products-list mt-5 py-5 container">
      <SectionTitle text={t("products.allProducts")} />

      <div className="mb-4 d-flex justify-content-center sticky-top">
        <input
          type="text"
          className="form-control w-50"
          placeholder={t("products.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredItems.length > 0 ? (
        <div className="row">
          {filteredItems.map((product, index) => (
            <ProductCard
              key={product.id}
              index={index}
              product={product}
              isArabic={isArabic}
              isFavorite={favorites.find((item) => item.id === product.id)}
              onAddToCart={(p) => dispatch(addToCart(p))}
              onToggleFavorite={(p) => dispatch(toggleFavorite(p))}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-5 text-muted fs-5">
          {t("products.noProductsFound")}
        </p>
      )}
    </div>
  );
};

export default ProductsList;
