import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import Loader from "../Loading";
import { Link } from "react-router-dom";

function DashboardProducts() {
  const dispatch = useDispatch();
  const {
    items = [],
    loading,
    error,
  } = useSelector((state) => state.products || {});
  const [searsh, setSearsh] = useState([]);
  const handleInptSearsh = (e) => {
    const value = e.target.value.toLowerCase();
    const filterd = items.filter((item) => {
      return item.title.toLowerCase().includes(value);
    });
    setSearsh(filterd);
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <div className="products-list mt-5 py-5 container">
        <div>
          <h3 className="text-center">All Products</h3>
        </div>
        <div>
          <input
            type="text"
            value={searsh}
            onChange={(e) => {
              setSearsh(e.target.value);
            }}
          />
        </div>
        <div className="row">
          {items.map((product) => (
            <div
              className="col-lg-3 col-md-6 col-sm-12 text-center"
              key={product.id}
            >
              <Link
                className="text-dark text-decoration-none"
                to={`/products/${product.id}`}
              >
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {/* {isArabic ? product.name_ar : product.name_en} */}
                    {product.title}
                  </h5>
                  <p className="card-text">
                    {/* {isArabic ? product.description_ar : product.description_en} */}
                  </p>
                  <div className="d-flex justify-content-center gap-5">
                    <p>${product.price}</p>
                    <p>{product.price_after_discount}</p>
                  </div>
                </div>
              </Link>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardProducts;
