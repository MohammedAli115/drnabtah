import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "./SignUp.module.css"; // نفس ملف Login module
import Logo from "./Logo";

function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) return showToast("warning", t("signup.username_required"));
    if (!email) return showToast("warning", t("signup.email_required"));
    if (!password) return showToast("warning", t("signup.password_required"));
    if (password !== confirmPassword)
      return showToast("warning", t("signup.password_mismatch"));

    try {
      const response = await axios.post(
        "https://e-commerce-backend-production-dcd8.up.railway.app/api/auth/register",
        {
          username,
          email,
          password,
          password_confirmation: confirmPassword,
        }
      );

      if (response.data.status) {
        showToast("success", t("signup.success"));
        navigate("/login");
      } else {
        showToast("error", response.data.message || t("signup.error"));
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || t("signup.error"));
    }
  };

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5 pt-5 container">
      <div className="text-center w-100" style={{ maxWidth: "400px" }}>
        <form className={styles.form_main} onSubmit={handleSignUp}>
          <Logo />

          <p className={styles.heading}>{t("signup.title")}</p>

          <div className={styles.inputContainer}>
            <svg
              className={styles.inputIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <input
              type="text"
              className={styles.inputField}
              placeholder={t("signup.username_placeholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <svg
              className={styles.inputIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1l-8 5-8-5V4zm0 
                       2.236l8 5 8-5V12a2 2 0 0 1-2 2H2a2 2 0 0 
                       1-2-2V6.236z"
              />
            </svg>
            <input
              type="email"
              className={styles.inputField}
              placeholder={t("signup.email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <svg
              className={styles.inputIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 
                       0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 
                       2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 
                       2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
              />
            </svg>
            <input
              type="password"
              className={styles.inputField}
              placeholder={t("signup.password_placeholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputContainer}>
            <svg
              className={styles.inputIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 
                       0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 
                       2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 
                       2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
              />
            </svg>
            <input
              type="password"
              className={styles.inputField}
              placeholder={t("signup.confirm_password_placeholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className={styles.button} type="submit">
            {t("signup.submit")}
          </button>

          <div className="d-flex justify-content-center">
            <Link className={styles.forgotLink} to="/login">
              {t("signup.have_account")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
