// src/components/ProductSlider.js
import React, { useRef, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay, Virtual } from "swiper/modules";
import Loader from "./Loading";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { fetchProducts } from "../features/products/productsSlice";
import { Link } from "react-router-dom";

const ProductCard = memo(({ product, index, isArabic, onAddToCart }) => (
  <motion.div
    className="card rounded-3 mb-2"
    style={{
      cursor: "pointer",
      width: "100%",
      overflow: "hidden",
      height: "100%",
      position: "relative",
    }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -4 }}
  >
    <div className="position-relative">
      <Link
        className="text-dark text-decoration-none"
        to={`/products/${product.id}`}
      >
        <img
          loading="lazy"
          src={product.image}
          alt={product.title || ""}
          className="card-img-top w-100"
          style={{ height: "230px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h6 className="card-title fw-bold mb-1">
            {product.title?.length > 40
              ? `${product.title.substring(0, 40)}...`
              : product.title || ""}
          </h6>
          <p className="card-text text-muted mb-3">${product.price}</p>
        </div>
      </Link>
      <div
        className={` icons-cart-like position-absolute translate-middle-y d-flex align-items-center flex-column justify-content-center w-100 ${isArabic ? "flex-row-reverse" : ""}`}
        style={{ bottom: "-100px", display: "none" }}
      >
        <span onClick={() => onAddToCart(product)}>
          <i className="mx-3 fs-5 fa-solid fa-cart-plus"></i>
        </span>
        <span>
          <i className="fs-5 fa-solid fa-heart"></i>
        </span>
      </div>
    </div>
  </motion.div>
));

const ProductSlider = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isArabic = lang === "ar";

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const swiperRef = useRef();

  useEffect(() => {
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const slideToPrev = () => swiperRef.current?.slidePrev();
  const slideToNext = () => swiperRef.current?.slideNext();

  if (!items || items === undefined) {
    return <Loader />;
  }

  return (
    <section className="py-5 position-relative my-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link
            to="/products"
            className="px-3 rounded shadow-md py-1 text-dark fs-5 fw-bold mb-0 d-flex align-items-center gap-2"
            style={{
              cursor: "pointer",
              border: "1px solid #60d8d2",
              textDecoration: "none",
            }}
          >
            {t("slider.allProducts")}
            {isArabic ? (
              <FaLongArrowAltLeft color="#60d8d2" />
            ) : (
              <FaLongArrowAltRight />
            )}
          </Link>
          <div className="d-flex gap-2">
            <button
              style={{ border: "1px solid #60d8d2", color: "#60d8d2" }}
              className="btn rounded-circle p-2"
              onClick={slideToPrev}
            >
              {isArabic ? <FaArrowRight /> : <FaArrowLeft />}
            </button>
            <button
              style={{ border: "1px solid #60d8d2", color: "#60d8d2" }}
              className="btn rounded-circle p-2"
              onClick={slideToNext}
            >
              {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
            </button>
          </div>
        </div>

        <Swiper
          key={lang}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          modules={[FreeMode, Navigation, Autoplay, Virtual]}
          virtual
          breakpoints={{
            320: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
          }}
        >
          {items.map((product, index) => (
            <SwiperSlide key={product.id} virtualIndex={index}>
              <ProductCard
                product={product}
                index={index}
                isArabic={isArabic}
                onAddToCart={(p) => dispatch(addToCart(p))}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductSlider;
