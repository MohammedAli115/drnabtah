import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  fetchCart,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { fetchProducts, setPage } from "../features/products/productsSlice";
import Loader from "./Loading";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { fetchCategories } from "../features/categories/categoriesSlice";

const ProductCard = memo(
  ({
    product,
    favorites,
    cartItems,
    onAddToCart,
    onRemoveFromCart,
    onToggleFavorite,
    index,
    currency,
  }) => {
    const isFav = favorites.some((item) => item.id === product.id);
    const isInCart = cartItems.some((item) => item.product.id === product.id);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleCart = async () => {
      setIsLoading(true);
      try {
        if (isInCart) {
          await onRemoveFromCart(product.id);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "info",
            title: "تمت الإزالة",
            text: "تمت إزالة المنتج من السلة",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } else {
          await onAddToCart(product.id);
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "تمت الإضافة",
            text: "تمت إضافة المنتج إلى السلة بنجاح",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "خطأ",
          text: "حدث خطأ أثناء تعديل السلة",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <motion.div
        className="col-lg-4 col-md-6 mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <div
          className="parent-icons-products-showandFAV card h-100 overflow-hidden border-0 position-realtive"
          style={{
            boxShadow: "0 2px 10px #00000013",
            backgroundColor: "#d3fafc31",
          }}
        >
          <img
            src={product.image_url}
            className="card-img-top"
            alt={product.name_en}
            style={{ maxHeight: "300px", objectFit: "cover" }}
            loading="lazy"
          />
          <div className="card-body text-center">
            <h4 className="fw-bold">
              {currency.lang === "ar" ? product.name_ar : product.name_en}
            </h4>

            <div className="d-flex justify-content-center align-items-center gap-3 mb-1">
              <span className="text-muted text-decoration-line-through">
                {product.price} {currency.symbol}
              </span>
              <span className="fw-bold text-dark fs-6">
                {product.price_after_discount} {currency.symbol}
              </span>
            </div>
          </div>
          {/* </Link> */}

          <button
            className="btn btn-sm rounded-3 fs-4"
            style={
              isInCart
                ? { backgroundColor: "#ffffffff", color: "#f36219ff" }
                : { backgroundColor: "#ffffffff", color: "#19cbf3ff" }
            }
            onClick={handleToggleCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : isInCart ? (
              <i className="fa-solid fa-trash-can-arrow-up"></i>
            ) : (
              <i className="fa-solid fa-cart-plus"></i>
            )}
          </button>

          {/* FAV and Show Product */}
          <div
            className="d-flex icons-products-showandFAV justify-content-center flex-column position-absolute"
            style={{ top: "10px", right: "-100px" }}
          >
            <span
              className="btn px-3 fs-4 border-0"
              onClick={() => onToggleFavorite(product)}
            >
              {isFav ? (
                <i className="fa-solid fa-heart text-danger"></i>
              ) : (
                <i className="fa-regular fa-heart text-info"></i>
              )}
            </span>
            <Link
              to={`/products/${product.id}`}
              className="btn px-3 fs-4 border-0"
            >
              <i className="fa-solid fa-eye" style={{ color: "#000000ff" }}></i>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }
);

const ProductsList = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const {
    items = [],
    loading,
    error,
    page,
    totalPages,
    limit,
  } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.items || []);
  const favorites = useSelector((state) => state.favorites);
  const cartItems = useSelector((state) => state.cart.data.items || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
    dispatch(fetchCategories());
  }, [dispatch, page, limit]);

  const currency = {
    lang: i18n.language,
    symbol: i18n.language === "ar" ? "ج.م" : "EGP",
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_ar?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId) => {
    return dispatch(addItemToCart({ productId, quantity: 1 }))
      .unwrap()
      .then(() => dispatch(fetchCart()));
  };

  const handleRemoveFromCart = (productId) => {
    const itemInCart = cartItems.find((item) => item.product.id === productId);
    if (!itemInCart) return;
    return dispatch(removeItemFromCart({ itemId: itemInCart.id }))
      .unwrap()
      .then(() => dispatch(fetchCart()));
  };

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  if (loading) return <Loader />;
  if (error) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: `حدث خطأ أثناء جلب المنتجات: ${error}`,
    });
    return null;
  }

  return (
    <>
      {/* Offcanvas Sidebar for mobile */}
      <div
        style={{ width: "200px" }}
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasSidebar"
      >
        <div className="offcanvas-header">
          {/* <h5 className="offcanvas-title">{t("categories.title")}</h5> */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* <input
            type="text"
            className="form-control rounded-pill px-4 mb-3"
            placeholder={t("products.search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
          <div className="d-flex flex-column gap-2 mt-5">
            <button
              className={`btn px-3 rounded-4 fw-medium ${
                selectedCategory === "all" ? "text-white" : "text-dark"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === "all" ? "#0dcaf0" : "#e9f8f7",
                border: "1px solid #0dcaf0",
              }}
              onClick={() => setSelectedCategory("all")}
            >
              {t("categories.all")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn px-3 rounded-4 fw-medium ${
                  selectedCategory === cat.id ? "text-white" : "text-dark"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === cat.id ? "#0dcaf0" : "#e9f8f7",
                  border: "1px solid #0dcaf0",
                }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {i18n.language === "ar" ? cat.name_ar : cat.name_en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container-xxl">
        <h1
          className="text-center  mb-4"
          style={{
            marginTop: "100px",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#29a1bbff",
          }}
        >
          {i18n.language === "ar" ? " كل المنتجات " : "All Products"}
        </h1>
        <input
          style={{
            marginTop: "10px",
            maxWidth: "400px",
            border: "1px solid #000",
            textAlign: "center",
          }}
          type="text"
          className="form-control rounded-3 px-4 mb-3 mx-auto"
          placeholder={t("products.search_placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="row">
          {/* Sidebar for large screens */}
          <div className="col-lg-3 d-none d-lg-block">
            <div
              className="position-sticky"
              style={{ top: "150px", margin: "10px 0" }}
            >
              <div className="d-flex flex-column gap-2">
                <button
                  className={`btn px-3 rounded-3 fw-medium ${
                    selectedCategory === "all" ? "text-white" : "text-dark"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === "all" ? "#29a1bbff" : "#e9f8f7",
                    border: "1px solid #29a1bbff",
                  }}
                  onClick={() => setSelectedCategory("all")}
                >
                  {t("categories.all")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`btn px-3 rounded-3 fw-medium ${
                      selectedCategory === cat.id ? "text-white" : "text-dark"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === cat.id ? "#29a1bbff" : "#e9f8f7",
                      border: "1px solid #29a1bbff",
                    }}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9" style={{ marginTop: "10px" }}>
            <div className="d-lg-none text-end mb-3">
              <button
                className="btn btn-outline-info"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
              >
                ☰
              </button>
            </div>

            {filteredItems.length > 0 ? (
              <div className="row">
                {filteredItems.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    index={index}
                    product={product}
                    favorites={favorites}
                    cartItems={cartItems}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onToggleFavorite={handleToggleFavorite}
                    currency={currency}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center mt-5 text-muted fs-5">
                {t("products.not_found")}
              </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
                <button
                  className="btn btn-outline-secondary rounded-pill px-3"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  {t("pagination.prev")}
                </button>
                <span className="fw-medium">
                  {t("pagination.page")} {page} {t("pagination.of")}{" "}
                  {totalPages}
                </span>
                <button
                  className="btn btn-outline-secondary rounded-pill px-3"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  {t("pagination.next")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
