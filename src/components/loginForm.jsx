import React, { useState, useContext, useEffect } from "react";
import "./loginForm.scss";
import { FaLock, FaUser, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


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



const LoginForm = () => {
  const { email, setEmail, password, setPassword,name,setName,phone, setPhone, } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  // const [ phone, setPhone]= useState("")
  // const [ name, setName]= useState("")
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha()); //  تصادفی
  const [userCaptcha, setUserCaptcha] = useState(""); // ورودی کاربر
  const [captchaError, setCaptchaError] = useState(""); // خطا
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const clearFormFields = () => {
  setEmail("");
  setPassword("");
  setName("");
  setPhone("");
  setUserCaptcha("");
  setCaptchaError("");
  setErrorMessage("");};


  const validateForm = () => {
  let isValid = true;

  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const iranPhonePattern = /^(\+98|0)?9\d{9}$/;

  // Reset previous errors
  setEmailError("");
  setPasswordError("");
  setPhoneError("");

  // Email
  if (!emailPattern.test(email)) {
    setEmailError("فرمت ایمیل نامعتبر است.");
    isValid = false;
  }

  // Password
  if (password.length < 6) {
    setPasswordError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
    isValid = false;
  }

  // Phone (only if signing up)
  if (!isLogin) {
    if (!phone) {
      setPhoneError("شماره تلفن الزامی است.");
      isValid = false;
    } else if (!iranPhonePattern.test(phone)) {
      setPhoneError("فرمت شماره تلفن معتبر نیست.");
      isValid = false;
    }
  }

  return isValid;
};
  const handlePhoneChange = (e) => {
  let value = e.target.value;
  // Remove all non-digit characters
  value = value.replace(/\D/g, '');
  
  // If it starts with 0, keep it, otherwise add 0
  if (value.length > 0 && !value.startsWith('0')) {
    value = '0' + value;
  }
  
  // Limit to 11 digits max
  if (value.length > 11) {
    value = value.substring(0, 11);
  }
  
  setPhone(value);};
  

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
          setErrorMessage("ایمیل و یا رمز عبوری اشتباه است.");
        }
      } else {
        const user = { email, password, name, phone };
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Account registered:", email);
        setErrorMessage("");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
        // console.log("Account sign uped:", email);
        // setErrorMessage("");
        // setIsLogin(true);
      }
    }, 2000);
  };

  return (
   

    <div className="login-container">
      {/* Left side  */}
      <div className="form-side">
         <div className={`form-animation ${isLogin ? 'login-mode' : 'signup-link'}`}>
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <h1>{isLogin ? "ورود کاربر" : "ثبت نام"}</h1>
         {/* vv */}
        {!isLogin && (<>
  
        <div className="input-box">
          <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
         <FaUser className="icon" />
        </div>

        <div className="input-box telDetail">
         <input
          type="tel"
          
          placeholder="شماره تلفن (09123456789)"
          value={phone}
          onChange={handlePhoneChange}
          
          required
        />
         <FaPhone className="icon" />
       </div>
       {phoneError && <p className="error-message">{phoneError}</p>} 
       </>)}


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
        {emailError && <p className="error-message">{emailError}</p>}
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
        {passwordError && <p className="error-message">{passwordError}</p>}
       
      


        {/* meow */}
        <div className="captcha-container">
          <div className="captcha-box">
            <p>{captcha}</p>
            <button type="button" onClick={() => setCaptcha(generateCaptcha())}>
              Refresh Captcha
            </button>
          </div>
          <input
          className="captcha-input"
            type="text"
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
            required
          />
          {captchaError && <p className="error-message-captcha">{captchaError}</p>}
        </div>
        {/* meow */}
        
        {isLogin && (<div className="remember-forgot">
  
         <label>
         <input type="checkbox" className="check-boxx" />
          مرا به خاطر بسپار
         </label>
         <a href="#"> فراموشی رمز؟</a></div>)}
          

          {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit"  className={`btn ${loading ? "loading" : ""}`}>
          {loading ? "Loading..." : isLogin ? "ورود " : "ثبت نام"}
        </button>
        <div className="signup-link">
          <p>
            {isLogin ? (
              <>
                حساب کاربری ندارید؟{" "}
                <a href="#"onClick={() => {clearFormFields();setIsLogin(false);}}>
                  ساخت حساب کاربری
                </a>
              </>
            ) : (
              <>
                قبلاً ثبت نام کرده‌اید؟{" "}
                <a href="#"onClick={() => {clearFormFields();setIsLogin(true); }} >
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
