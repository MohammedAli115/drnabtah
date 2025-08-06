import React, { useEffect, useState } from "react";
import api from "./../api/axios";
import SectionTitle from "./SectionTitle";
import { t } from "i18next";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  const fetchReviews = async (pageNumber) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/reviews?page=${pageNumber}&per_page=8`);
      let fetchedReviews = data.data.data;

      // خلط المصفوفة عشوائياً
      fetchedReviews = fetchedReviews
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setReviews(fetchedReviews);

      // تحديث عدد الصفحات من بيانات pagination
      setTotalPages(data.data.pagination.total_pages || 1);
    } catch (err) {
      console.log("ERROR FETCHING DATA");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (url, title) => {
    Swal.fire({
      imageUrl: url,
      imageAlt: title,
      showCloseButton: true,
      showConfirmButton: false,
      width: "90%",
      height: "100vh",
      background: "#fff",
      customClass: {
        popup: "rounded",
      },
    });
  };

  return (
    <div style={{ margin: "100px 0 30px 0" }}>
      <div className="container">
        <SectionTitle text={t("reviews.title")} />

        {loading ? (
          <p className="text-center my-5">{t("loading")}</p>
        ) : (
          <>
            <div className="row g-4">
              <AnimatePresence>
                {reviews.map((r, i) => (
                  <motion.div
                    style={{}}
                    key={r.id}
                    className="col-lg-3 col-md-4 col-sm-6 pt-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div
                      className="card h-100 "
                      style={{
                        cursor: "pointer",
                        borderRadius: "6px",
                        overflow: "hidden",
                        boxShadow: "0 4px 20px #21cae41a",
                      }}
                      onClick={() => handleImageClick(r.image_url, r.title_ar)}
                    >
                      <img
                        src={r.image_url}
                        alt={r.title_ar}
                        className="card-img-top"
                        style={{ height: "70%" }}
                      />
                      <div className="card-body text-center">
                        <p
                          className="mb-0"
                          style={{ fontSize: "1.3rem", fontWeight: "500" }}
                        >
                          {r.title_ar}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
              <button
                className={`btn px-3 rounded-pill shadow-sm ${
                  page === 1 ? "btn-secondary disabled" : "btn-outline-info"
                }`}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <i class="fa-solid fa-angles-right"></i>
              </button>

              <span style={{ fontWeight: "500" }}>
                {page} / {totalPages}
              </span>

              <button
                className={`btn px-3  rounded-pill shadow-sm ${
                  page === totalPages
                    ? "btn-secondary disabled"
                    : "btn-outline-info"
                }`}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomerReviews;
