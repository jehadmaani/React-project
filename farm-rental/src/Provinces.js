// src/pages/Provinces.js

import React from "react";
import { Link } from "react-router-dom";
import "./provinces.css";

function Provinces() {
  const provinces = [
    { name: "عمان", path: "/farms?province=عمان" },
    { name: "الزرقاء", path: "/farms?province=الزرقاء" },
    {  name: "إربد", path: "/farms?province=إربد" } ,
    { name: "جرش", path: "/farms?province=جرش" },
    { name: "الكرك", path: "/farms?province=الكرك" },
    { name: "عجلون", path: "/farms?province=عجلون" }, // path هو query parm. يحمل اسم المحافظة.
    { name: "مادبا", path: "/farms?province=مادبا" },
    { name: "السلط", path: "/farms?province=السلط" },
    { name: "الطفيلة", path: "/farms?province=الطفيلة" },
    { name: "المفرق", path: "/farms?province=المفرق" },
  ];

  return (
    // العنوان والأزرار
    <div className="provinces-container">
      <h1 style={{ color: "#42556a" }}>اختر محافظة</h1>
      {/* روابط المحافظات */}
      <div className="buttons-container">
        {provinces.map(
          (
            province //  لإنشاء رابط لكل محافظة Reusability
          ) => (
            <Link // تحميل الصفحة (Single Page Application).انشاء روابط عشان ما اضل
              key={province.name}
              to={province.path}
              className="province-button"
            >
              {province.name}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Provinces;
