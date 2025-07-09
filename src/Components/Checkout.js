import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { removeFromCart, addToCart, decreaseQuantity } from "../features/cart/cartSlice";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submitOrder = async (orderData) => {
    // المحاولة الأولى: JSONP
    try {
      await submitWithJsonp(orderData);
      return true;
    } catch (jsonpError) {
      console.log('JSONP failed, trying POST');
    }

    // المحاولة الثانية: POST مع CORS proxy
    try {
      await submitWithPost(orderData);
      return true;
    } catch (postError) {
      console.log('POST failed');
      throw postError;
    }
  };

  const submitWithJsonp = (data) => {
    return new Promise((resolve, reject) => {
      const callbackName = `jsonp_${Date.now()}`;
      const timeout = 15000; // 15 ثانية

      window[callbackName] = (response) => {
        cleanup();
        response.status === 'success' ? resolve(response) : reject(response);
      };

      const timer = setTimeout(() => {
        cleanup();
        reject(new Error('Request timeout'));
      }, timeout);

      const cleanup = () => {
        clearTimeout(timer);
        delete window[callbackName];
        script.remove();
      };

      const script = document.createElement('script');
      script.src = `https://script.google.com/macros/s/AKfycbx8rn2jZYhIFKFycDZ8v5j3YgLnAV4Wrhmz_xBxZ0tyUNXH60gEQAzcIUkNrNHWpK3F/exec?callback=${callbackName}&data=${encodeURIComponent(JSON.stringify(data))}`;
      script.onerror = () => {
        cleanup();
        reject(new Error('Script load error'));
      };
      
      document.body.appendChild(script);
    });
  };

  const submitWithPost = async (data) => {
    const response = await fetch('https://corsproxy.io/?https://script.google.com/macros/s/AKfycbx8rn2jZYhIFKFycDZ8v5j3YgLnAV4Wrhmz_xBxZ0tyUNXH60gEQAzcIUkNrNHWpK3F/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const customerData = {
      name: e.target[0].value,
      phone: e.target[1].value,
      address: e.target[2].value,
    };

    const orderData = {
      customer: customerData,
      cart,
      total,
      date: new Date().toLocaleString(),
    };

    try {
      await submitOrder(orderData);
      navigate("/invoice", { state: orderData });
    } catch (error) {
      setError(isArabic ? "فشل إرسال الطلب، يرجى المحاولة مرة أخرى" : "Failed to submit order, please try again");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5" style={{ direction: isArabic ? "rtl" : "ltr" }}>
      <h2 className="mb-4">{isArabic ? "إتمام الشراء" : "Checkout"}</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-muted">{isArabic ? "السلة فارغة" : "Your cart is empty"}</p>
      ) : (
        <div className="row">
          <div className="col-md-7">
            <ul className="list-group mb-4">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div style={{ flex: 1 }}>
                    <h6>{item.title}</h6>
                    <p className="mb-1">
                      {isArabic ? "السعر" : "Price"}: ${item.price}
                    </p>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <button className="btn btn-sm btn-light" disabled>
                        {item.quantity}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => dispatch(addToCart(item))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    {isArabic ? "حذف" : "Remove"}
                  </button>
                </li>
              ))}
            </ul>
            <h5 className="text-end">
              {isArabic ? "الإجمالي" : "Total"}: ${total.toFixed(2)}
            </h5>
          </div>

          <div className="col-md-5">
            <div className="card p-3">
              <h5 className="mb-3">
                {isArabic ? "معلومات العميل" : "Customer Info"}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    {isArabic ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {isArabic ? "رقم الهاتف" : "Phone Number"}
                  </label>
                  <input type="tel" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {isArabic ? "العنوان" : "Address"}
                  </label>
                  <textarea className="form-control" rows="2" required></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      {isArabic ? "جاري المعالجة..." : "Processing..."}
                    </>
                  ) : (
                    isArabic ? "تأكيد الطلب" : "Place Order"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;