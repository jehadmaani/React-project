import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Login.css";
import FarmsVideo from "./zzNe.mp4"; // أو "/videos/Farms.mp4" إذا كان في public

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // استدعاء useNavigate
  const { login } = useAuth(); // استدعاء  login من AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3008/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // استدعاء تسجيل الدخول
        navigate("/provinces"); //   الصفحة الرئيسية بعد تسجيل
      } else {
        setErrorMessage(data.message || "حدث خطأ أثناء تسجيل الدخول.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="video-container">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={FarmsVideo} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
        <div className="content-home">
          <h1>مرحباً بك في موقع المزارع</h1>
          <p>
            موقعنا يتيح لك فرصة استئجار مزارع في مختلف المناطق. يمكنك البحث عن
            المزارع المتاحة حسب المحافظة أو الموقع المفضل لديك. استمتع بتجربة
            فريدة مع الطبيعة من خلال موقعنا.
          </p>
          <p>
            يمكنك استعراض المزارع المتاحة، معرفة المزيد عن المواقع، والتخطيط
            لزيارتك القادمة. نقدم لك تجربة مريحة وآمنة للتمتع بالوقت في أحضان
            الطبيعة.
          </p>
        </div>
      </div>

      <div className="login-container">
        <h2>أدخل بياناتك</h2>
        <form onSubmit={handleLogin}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: "200px", marginLeft: "50px" }}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
        <p>
          لا تملك حساب؟ <a href="/signup">إنشاء حساب جديد</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
