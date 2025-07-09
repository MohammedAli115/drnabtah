// src/pages/ProductDetails.js
import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === id)
  );

  if (!product) return <p>المنتج غير موجود</p>;

  return (
    <div className="container py-5 mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid border"
            style={{ height: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h3>{product.title}</h3>
          <p className="text-muted">${product.price}</p>
          <p>{product.description || "وصف المنتج غير متوفر."}</p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => dispatch(addToCart(product))}
          >
            أضف إلى السلة 🛒
          </button>
          <Link to="/checkout" className="btn btn-success w-100">
            إتمام عمليه الشراء
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
