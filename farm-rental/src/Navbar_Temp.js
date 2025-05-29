import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // استيراد الـ hook الخاص بالتوثيق
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth(); // استخدام الـ hook لاستخراج معلومات المستخدم
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuActive(false); // إغلاق القائمة بعد تسجيل الخروج
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = () => {
    setMenuActive(false); // إغلاق القائمة عند النقر على رابط
  };

  return (
    <nav className="navbar">
      <div className="navbar-title"></div>
      <div
        className={`overlay ${
          menuActive ? "overlay-slide-right" : "overlay-slide-left"
        }`}
        id="overlay"
      >
        <ul className="navbar-links">
          {/* إخفاء زر "الرئيسية" إذا كان المستخدم قد سجل الدخول */}
          {!user && (
            <li>
              <Link to="/" onClick={handleLinkClick}>
                الرئيسية
              </Link>
            </li>
          )}
          {user && (
            <>
              {/* <li>
                <Link to="/provinces" onClick={handleLinkClick}>
                  الرئيسية
                </Link>
              </li> */}
              <li>
                <Link to="/provinces" onClick={handleLinkClick}>
                  المحافظات
                </Link>
              </li>
              <li>
                <Link to="/farminfo" onClick={handleLinkClick}>
                  رؤية الموقع
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about" onClick={handleLinkClick}>
              عن الموقع
            </Link>
          </li>
          {user && (
            <li style={{ marginTop: "20px" }}>
              <button onClick={handleLogout} className="logout-button">
                تسجيل الخروج
              </button>
            </li>
          )}
        </ul>
      </div>
      <div
        className={`hamburger-menu ${menuActive ? "active" : ""}`}
        id="hamburger-menu"
        onClick={toggleMenu}
      >
        <div className="menu-bar1"></div>
        <div className="menu-bar2"></div>
        <div className="menu-bar3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
