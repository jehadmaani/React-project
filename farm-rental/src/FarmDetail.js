// src/pages/FarmDetail.js

import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./FarmDetail.css";
import farm1 from "./ph1.jpeg";
import farm2 from "./ph2.jpeg";
import farm3 from "./ph3.jpeg";

const farmData = {
  1: {
    name: "مزرعة الهدوء",
    location: "عمان",
    description: "مزرعة رائعة ومريحة، محاطة بالطبيعة.",
    image: farm1,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "500 متر مربع",
  },
  2: {
    name: "مزرعة السعادة",
    location: "الزرقاء",
    description: "مزرعة عائلية ممتعة وملائمة للنزهات.",
    image: farm1,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "400 متر مربع",
  },
  3: {
    name: "مزرعة الأحلام",
    location: "إربد",
    description: "مزرعة خاصة للراحة والاسترخاء وسط الجبال.",
    image: farm3,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "600 متر مربع",
  },
  4: {
    name: "مزرعة الريف",
    location: "جرش",
    description: "مزرعة حديثة ومجهزة بالكامل، مثالية للعائلات.",
    image: farm3,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "700 متر مربع",
  },
  5: {
    name: "مزرعة النسيم",
    location: "الكرك",
    description: "مزرعة ذات مناظر خلابة وجو هادئ.",
    image: farm2,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "350 متر مربع",
  },
  6: {
    name: "مزرعة الوادي",
    location: "عجلون",
    description: "مزرعة تطل على وادٍ جميل، مثالية للتخييم.",
    image: farm2,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "800 متر مربع",
  },
  7: {
    name: "مزرعة الجبل",
    location: "مادبا",
    description: "مزرعة تقع على تلة تطل على مناظر خلابة.",
    image: farm2,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "650 متر مربع",
  },
  8: {
    name: "مزرعة الأمل",
    location: "السلط",
    description: "مزرعة صغيرة وجميلة لقضاء عطلة نهاية الأسبوع.",
    image: farm2,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "400 متر مربع",
  },
  9: {
    name: "مزرعة الصحوة",
    location: "الطفيلة",
    description: "مزرعة واسعة مع أنشطة ترفيهية متعددة.",
    image: farm1,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "900 متر مربع",
  },
  10: {
    name: "مزرعة البركة",
    location: "المفرق",
    description: "مزرعة حديثة ومنظمة، مخصصة للعائلات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_93874f61-ae72-490a-8e75-b4cff0168342.jpg?v=1644606842",
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "500 متر مربع",
  },
  11: {
    name: "مزرعة البركة",
    location: "المفرق",
    description: "مزرعة حديثة ومنظمة، مخصصة للعائلات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_93874f61-ae72-490a-8e75-b4cff0168342.jpg?v=1644606842",
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "500 متر مربع",
  },
  12: {
    name: "مزرعة البركة",
    location: "المفرق",
    description: "مزرعة حديثة ومنظمة، مخصصة للعائلات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_93874f61-ae72-490a-8e75-b4cff0168342.jpg?v=1644606842",
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "500 متر مربع",
  },

  13: {
    name: "مزرعة البركة",
    location: "المفرق",
    description: "مزرعة حديثة ومنظمة، مخصصة للعائلات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_93874f61-ae72-490a-8e75-b4cff0168342.jpg?v=1644606842",
    owner: "جهاد المعاني",
    phone: "079xxxxxxx",
    area: "500 متر مربع",
  },
  14: {
    name: "مزرعة الكرك",
    location: "الكرك",
    description: "مزرعة حديثة ومجهزة بالكامل، مثالية للعائلات.",
    image: farm3,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "700 متر مربع",
  },
  15: {
    name: "مزرعة الرمان",
    location: "الكرك",
    description: "مزرعة حديثة ومجهزة بالكامل، مثالية للعائلات.",
    image: farm3,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "700 متر مربع",
  },
  16: {
    name: "مزرعة الزمان",
    location: "الكرك",
    description: "مزرعة حديثة ومجهزة بالكامل، مثالية للعائلات.",
    image: farm3,
    owner: "جهاد المعاني",
    phone: "0798752801",
    area: "700 متر مربع",
  },
};
function FarmDetail() {
  const { id } = useParams(); // تمرير id عبر مسار الصفحة باستخدام مكتبة react-router-dom
  const farm = farmData[id]; //  الحصول على تفاصيل المزرعة بناء على id

  if (!farm) return <p>المزرعة غير موجودة.</p>;

  return (
    <div className="container farm-detail">
      <h2>{farm.name}</h2>
      <div className="farm-info">
        <img src={farm.image} alt={farm.name} className="farm-image" />
        <div className="farm-text">
          <p>
            <strong>الموقع:</strong> {farm.location}
          </p>
          <p>
            <strong>الوصف:</strong> {farm.description}
          </p>
          <p>
            <strong>اسم صاحب المزرعة:</strong> {farm.owner}
          </p>
          <p>
            <strong>رقم الهاتف:</strong> {farm.phone}
          </p>
          <p>
            <strong>مساحة المزرعة:</strong> {farm.area}
          </p>
          <div className="farm-buttons">
            <Link to={`/booking/${id}`} className="button">
              حجز المزرعة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmDetail;
