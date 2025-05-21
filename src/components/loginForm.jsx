import React, { useState, useContext, useEffect } from "react";
import "./loginForm.scss";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import NewsSection from "./NewsSection";

// Captcha
const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};


// const generateRandomGradient = () => {
//   const colors = [
//     "#4e54c8",
//     "#ffff",
//     "#0000",
//     "#FC466B",
//     "#EDDD53",
//     "#57C785",
//     "#2A7B9B",
//     "#090979",
//     "#833AB4",
//     "#EEAECA",
//     "#94BBE9",
//     "#acd7dd",
//     "#e9a5c4",
//     "#ff758c",
//     "#43cea2",
//     "#185a9d",
//     "#f7797d",
//     "#00c6ff",
//     "#ffb400",
//   ];
//   const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
//   const randomColor2 = colors[Math.floor(Math.random() * colors.length)];

//   return `linear-gradient(135deg, ${randomColor1}, ${randomColor2}, ${randomColor1})`;
// };

const LoginForm = () => {
  const { email, setEmail, password, setPassword } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha()); //  تصادفی
  const [userCaptcha, setUserCaptcha] = useState(""); // ورودی کاربر
  const [captchaError, setCaptchaError] = useState(""); // خطا

  const navigate = useNavigate();

  // // body dynamiccc
  // useEffect(() => {
  //   document.body.style.background = generateRandomGradient();
  //   return () => {
  //     document.body.className = ""; // removing class
  //   };
  // }, []);

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("فرمت ایمیل نامعتبر ");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("رمز عبور باید حداقل ۶ کاراکتر ");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    ////captcha
    if (userCaptcha !== captcha) {
      setCaptchaError("Incorrect Captcha");
      setCaptcha(generateCaptcha());
      return;
    } else {
      setCaptchaError("");
    }

    ////

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        ///
        const storedUser = JSON.parse(localStorage.getItem("user"));
        ///
        if (
          ///email === "test@example.com" && password === "password123") {
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          navigate("/dashboard");
        } else {
          setErrorMessage("ایمیل و یا رمز عبوری اشتباه");
        }
      } else {
        const user = { email, password };
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Account registered:", email);
        setErrorMessage("");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        // console.log("Account sign uped:", email);
        // setErrorMessage("");
        // setIsLogin(true);
      }
    }, 2000);
  };

  return (
   

    <div className="login-container">
      {/* Left side - just a styled div */}
      <div className="form-side">
         <div className={`form-animation ${isLogin ? 'login-mode' : 'signup-link'}`}>
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <h1>{isLogin ? "ورود کاربر" : "ثبت نام"}</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* meow */}
        <div className="captcha-container">
          <div className="captcha-box">
            <p>{captcha}</p>
            <button type="button" onClick={() => setCaptcha(generateCaptcha())}>
              Refresh Captcha
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
            required
          />
          {captchaError && <p className="error-message">{captchaError}</p>}
        </div>
        {/* meow */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" className="check-boxx" />
            مرا به خاطر بسپار
          </label>
          <a href="#"> فراموشی رمز؟</a>
        </div>
        <button type="submit"  className={`btn ${loading ? "loading" : ""}`}>
          {loading ? "Loading..." : isLogin ? "ورود " : "ثبت نام"}
        </button>
        <div className="signup-link">
          <p>
            {isLogin ? (
              <>
                حساب کاربری ندارید؟{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  ساخت حساب کاربری
                </a>
              </>
            ) : (
              <>
                قبلاً ثبت نام کرده‌اید؟{" "}
                <a href="#" onClick={() => setIsLogin(true)}>
                  ورود کاربر
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
    </div>
    </div>
    <div className="image-side"></div>
   </div> 
   
  );
};

export default LoginForm;
