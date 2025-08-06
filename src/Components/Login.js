import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import styles from "./Login.module.css";
import Logo from "./Logo";
import { useDispatch } from "react-redux";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.status) {
        const token = response.data.data.token;
        const userType = response.data.data.type;

        localStorage.setItem("token", token);

        Swal.fire({
          title: t("login.success"),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        if (userType === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message || t("login.error"),
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || t("login.error"),
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5 pt-5 container">
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <form className={styles.form_main} onSubmit={handleLogin}>
          <Logo />

          <p className={styles.heading}>{t("login.title")}</p>

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputField}
              placeholder={t("login.email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="password"
              className={styles.inputField}
              placeholder={t("login.password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to="/forgetPassword/send-code" className={styles.forgotLink}>
            {t("login.forgot_password")}
          </Link>

          <button className={styles.button} type="submit">
            {t("login.submit")}
          </button>

          <div className="d-flex justify-content-center">
            <Link className={styles.forgotLink} to="/signup">
              {t("login.no_account")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
