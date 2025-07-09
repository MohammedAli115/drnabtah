import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const InvoicePage = () => {
  const location = useLocation();
  const { customerData } = location.state || {};
  const cart = useSelector((state) => state.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currentDate = new Date().toLocaleString();

  if (!customerData || cart.length === 0)
    return <p className="text-center my-5">جاري تحميل الفاتورة...</p>;

  const handleManualPrint = () => {
    const content = document.getElementById("print-area").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>فاتورة الشراء</title>
          <style>
            body { font-family: Arial; padding: 20px; direction: rtl; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: center; }
            .info p { margin: 4px 0; }
            .total-row td { font-weight: bold; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="container my-5 pt-5">
      <div id="print-area">
        <div className="p-4 border shadow bg-white">
          <h2>🧾 فاتورة الشراء</h2>

          <div className="info">
            <p><strong>الاسم:</strong> {customerData.name}</p>
            <p><strong>رقم الهاتف:</strong> {customerData.phone}</p>
            <p><strong>العنوان:</strong> {customerData.address}</p>
            <p><strong>التاريخ والوقت:</strong> {currentDate}</p>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الكمية</th>
                <th>السعر</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="2">الإجمالي</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary me-2" onClick={handleManualPrint}>
          🖨️ طباعة الفاتورة
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
