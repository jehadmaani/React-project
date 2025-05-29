import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false); //  تحميل
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3008/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("تم إنشاء الحساب بنجاح!");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("حدث خطأ، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>إنشاء حساب جديد</h2>
      <form onSubmit={handleSignup}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* */}
        <div className="input-group">
          <label htmlFor="first-name">الاسم الأول</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="last-name">اسم العائلة</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="birthdate">تاريخ الميلاد</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="gender">الجنس</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">اختر...</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>
      </form>

      <p>
        لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a>
      </p>
    </div>
  );
}

export default Signup;
