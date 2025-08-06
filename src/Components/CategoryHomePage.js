import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesSlice.js";
import { Link } from "react-router-dom";

function CategoryHomePage() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const {
    items: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="container my-5 py-5 rounded-3"
      style={{
        boxShadow: "0 0 10px #0c93982b",
      }}
    >
      <h2
        className="fs-1 mb-5 text-center mx-auto "
        style={{
          letterSpacing: "2px",
          fontWeight: "600",
          color: "#60d8d2",
          position: "relative",
          width: "fit-content",
          paddingBottom: "8px",
          borderBottom: "3px solid #60d8d2",
        }}
      >
        {i18n.language === "ar" ? "الأقسام" : "Categories"}
      </h2>

      <div className="d-flex justify-content-between align-items-center">
        {categories.map((cat) => (
          <div className="" key={cat.id}>
            <div className="card h-100 text-center border-0 mx-2">
              <Link to="/products" className="text-decoration-none">
                <img
                  src={cat.image}
                  alt={cat.name_en}
                  className="w-100 h-100 img-cat-home"
                />
              </Link>
              <div className="card-body p-2">
                <h4
                  className="card-title mb-0 text-info fw-bold"
                  style={{ fontSize: "1rem" }}
                >
                  {i18n.language === "ar" ? cat.name_ar : cat.name_en}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryHomePage;
