import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import html2canvas from "html2canvas";

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  if (!state) {
    return (
      <div className="container my-5">
        <h4>لا توجد بيانات لعرض الفاتورة</h4>
        <button onClick={() => navigate("/")} className="btn btn-primary mt-3">
          العودة للرئيسية
        </button>
      </div>
    );
  }

  const { cart, address, city } = state;
  const shipping = city?.shipping_price || 0;
  const total = Number(cart.total) + Number(shipping);
  const name = localStorage.getItem("name");
  const phone = localStorage.getItem("whatsappNum");
  console.log("phone", phone);
  console.log("name", name);
  const handleConfirmOrder = async () => {
    try {
      const session_id = localStorage.getItem("session_id");
      const token = localStorage.getItem("token");

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await api.post(
        "/order/checkout",
        { session_id: session_id || null, address_id: address.id, name, phone },
        { headers }
      );

      Swal.fire({
        icon: "success",
        title: "تم تأكيد طلبك بنجاح ",
        text: "شكرا لإختيارك نبته, سيتم التواصل معك من قبل فريق نبته لمتابعه طلبك.",
        timer: 9000,
        showConfirmButton: false,
      });

      localStorage.removeItem("name");
      localStorage.removeItem("phone");
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "لم يتم تأكيد الطلب",
      });
    }
  };

  const handleDownloadImage = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "invoice.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container my-5 py-5">
      <div
        ref={invoiceRef}
        className="p-4 border rounded shadow"
        style={{
          maxWidth: 800,
          margin: "auto",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5fefbff",
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">فاتورة الطلب</h2>
        </div>

        <div className="mb-4 border p-2 rounded">
          <p className="text-muted mb-0">التاريخ: {date}</p>
          <p className="text-muted">الوقت: {time}</p>
          <p>
            <strong> الأسم:</strong> {name}
          </p>
          <p>
            <strong> رقم الهاتف:</strong> {address.phone}
          </p>
          <p>
            <strong>رقم الواتساب:</strong> {phone}
          </p>
          <p>
            <strong>العنوان:</strong> {address.address}
          </p>
          <p>
            <strong>المدينة:</strong> {city?.name_ar}
          </p>
        </div>

        <div>
          <h5 className="border-bottom pb-2 mb-3">تفاصيل المنتجات</h5>
          <table className="table table-striped table-bordered text-center">
            <thead className="">
              <tr>
                <th>المنتج</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.product?.name_ar || item.product?.name}</td>
                  <td>{item.price} EGP</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity} EGP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-top pt-3 text-end">
          <p>
            <strong>تكلفة الشحن:</strong> {+shipping} EGP
          </p>
          <h5 className="fw-">الإجمالي الكلي: {+total} EGP</h5>
        </div>
      </div>

      <div className="text-center mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <button onClick={handleConfirmOrder} className="btn btn-success">
          تأكيد الطلب
        </button>
        <button onClick={handleDownloadImage} className="btn btn-primary">
          تحميل الفاتورة
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
