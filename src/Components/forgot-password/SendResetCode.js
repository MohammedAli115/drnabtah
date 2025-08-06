// import React, { useState } from "react";
// import api from "./../../api/axios";

// function SendResetCode({ onCodeSent }) {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setValidationErrors({});
//     setIsLoading(true);

//     // التحقق من الصحة على العميل أولاً
//     if (!email) {
//       setError("يرجى إدخال البريد الإلكتروني");
//       setIsLoading(false);
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("صيغة البريد الإلكتروني غير صحيحة");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("email", email);

//       const response = await api.post("/auth/send-reset-code", formData);

//       if (response.data.success) {
//         setSuccess("تم إرسال كود التأكيد إلى بريدك الإلكتروني بنجاح");
//         if (onCodeSent) {
//           onCodeSent(email); // إرسال البريد الإلكتروني للعنصر الأب
//         }
//       } else {
//         setError(
//           response.data.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى"
//         );
//       }
//     } catch (err) {
//       // معالجة خطأ 422 (أخطاء التحقق)
//       if (err.response?.status === 422) {
//         if (err.response.data?.errors) {
//           setValidationErrors(err.response.data.errors);
//           const firstError = Object.values(err.response.data.errors)[0][0];
//           setError(firstError || "بيانات غير صالحة");
//         } else {
//           setError("البيانات المرسلة غير صالحة");
//         }
//       }
//       // معالجة أخطاء أخرى
//       else if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//   <div
//     className="container d-flex justify-content-center align-items-center"
//     style={{ margin: "20px 0 130px 0" }}
//   >
//     <div
//       className="text-center w-100"
//       style={{ maxWidth: "400px", margin: "20px 0" }}
//     >
//       <p className="text-muted mb-4">
//         سيصلك كود التحقق على البريد الإلكتروني المسجل لدينا
//       </p>

//       {error && (
//         <div className="alert alert-danger text-right" role="alert">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="alert alert-success text-right" role="alert">
//           {success}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label text-right d-block">
//             البريد الإلكتروني
//           </label>
//           <input
//             type="email"
//             id="email"
//             className={`form-control text-right ${
//               validationErrors.email ? "is-invalid" : ""
//             }`}
//             placeholder="example@domain.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             autoComplete="email"
//           />
//           {validationErrors.email && (
//             <div className="invalid-feedback text-right">
//               {validationErrors.email[0]}
//             </div>
//           )}
//         </div>
//         <button
//           className="btn btn-primary w-100 py-2"
//           type="submit"
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <span
//                 className="spinner-border spinner-border-sm me-2"
//                 role="status"
//                 aria-hidden="true"
//               ></span>
//               جارٍ الإرسال...
//             </>
//           ) : (
//             "إرسال كود التحقق"
//           )}
//         </button>
//       </form>
//     </div>
//   </div>
// );
// }

// export default SendResetCode;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ استدعاء useNavigate
import api from "./../../api/axios";

function SendResetCode({ onCodeSent }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); // ✅ تعريف navigate

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setValidationErrors({});
    setIsLoading(true);

    if (!email) {
      setError("يرجى إدخال البريد الإلكتروني");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("صيغة البريد الإلكتروني غير صحيحة");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await api.post("/auth/send-reset-code", formData);

      if (response.data.success) {
        setSuccess("تم إرسال كود التأكيد إلى بريدك الإلكتروني بنجاح");


        // ✅ التوجيه لصفحة OTP
        setTimeout(() => {
          navigate("/otp", { state: { email } }); // 👈 إرسال البريد مع التوجيه لو احتجته هناك
        }, 1000); // تأخير بسيط علشان يظهر الـ success
      } else {
        setError(
          response.data.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى"
        );
      }
    } catch (err) {
      if (err.response?.status === 422) {
        if (err.response.data?.errors) {
          setValidationErrors(err.response.data.errors);
          const firstError = Object.values(err.response.data.errors)[0][0];
          setError(firstError || "بيانات غير صالحة");
        } else {
          setError("البيانات المرسلة غير صالحة");
        }
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ margin: "20px 0 130px 0" }}
    >
      <div
        className="text-center w-100"
        style={{ maxWidth: "400px", margin: "20px 0" }}
      >
        <p className="text-muted mb-4">
          سيصلك كود التحقق على البريد الإلكتروني المسجل لدينا
        </p>

        {/* {error && (
          <div className="alert alert-danger text-right" role="alert">
            {error}
          </div>
        )} */}

        {success && (
          <div className="bg-info text-right" >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-right d-block">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              className={`form-control text-right ${
                validationErrors.email ? "is-invalid" : ""
              }`}
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
            {validationErrors.email && (
              <div className="invalid-feedback text-right">
                {validationErrors.email[0]}
              </div>
            )}
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                جارٍ الإرسال...
              </>
            ) : (
              "إرسال كود التحقق"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendResetCode;
