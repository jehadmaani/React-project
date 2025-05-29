// src/pages/FarmList.js

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./FarmList.css";
import { Link } from "react-router-dom";

const farms = [
  {
    id: 1,
    name: "مزرعة الهدوء",
    location: "عمان",
    price: 100,
    description: "مزرعة رائعة ومريحة، محاطة بالطبيعة.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t39.30808-6/344738981_625921855722778_7234506202072025372_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=RXH8Ls3rWPkQ7kNvgGwgXKm&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=AA5t0Rk35x9qxUUkocNDaUy&oh=00_AYA2ciqA7ED71BQwCGDYJdk7WMgfbCQS3t79zh1SWzU8EQ&oe=672BC16D",
  },
  {
    id: 2,
    name: "مزرعة السعادة",
    location: "الزرقاء",
    price: 80,
    description: "مزرعة عائلية ممتعة وملائمة للنزهات.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t1.6435-9/209569350_2982673391976754_4815012581416682322_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=eXuYlsksm54Q7kNvgHfM0gU&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=AhmHTdKhUpGKz7F7buS9xXl&oh=00_AYBkBEDcM4CbpYkM2YoY81kR5KRiW-Za8RxPdLeAKTvS4g&oe=674D6421",
  },
  {
    id: 3,
    name: "مزرعة الأحلام",
    location: "إربد",
    price: 90,
    description: "مزرعة خاصة للراحة والاسترخاء وسط الجبال.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t1.6435-9/206391739_2982673478643412_4468058879680304453_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tuzil9e9hfsQ7kNvgGVw3wB&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=AhBWwqlmas_PDhiNhovGi-M&oh=00_AYCaTIhvNFX4LBhDwpNU6XdyrAPGYgszIt9YbGuA3VA6kA&oe=674D8061",
  },
  {
    id: 4,
    name: "مزرعة الريف",
    location: "جرش",
    price: 110,
    description: "مزرعة حديثة ومجهزة بالكامل، مثالية للعائلات.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t1.6435-9/207102596_2982673568643403_2213208202382598621_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ICp_rR9ElbAQ7kNvgHj5u-5&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=AKEY87GJGPr607TwLhvJVkn&oh=00_AYDoUtFqBE7vvuwVQveJjSm6uzvkcVoKRukBVNmGkH3KGw&oe=674D5100",
  },
  {
    id: 5,
    name: "مزرعة النسيم",
    location: "الكرك",
    price: 75,
    description: "مزرعة ذات مناظر خلابة وجو هادئ.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t39.30808-6/450261047_508434808204554_7657569594526206889_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=D-ejtPCL5xwQ7kNvgFs0_3M&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=A_2qQK7cuTSABVrJG94CCJ0&oh=00_AYAzgBwlVZkE0YzXc-Wj_j4wZAuGH-Oj8c1OeA_nP-Hw4Q&oe=672BB27F",
  },
  {
    id: 6,
    name: "مزرعة الوادي",
    location: "عجلون",
    price: 120,
    description: "مزرعة تطل على وادٍ جميل، مثالية للتخييم.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t39.30808-6/441542357_7439975406132023_4228665475576062923_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=xV-TltYMcq4Q7kNvgHfJkey&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=AIOYT1dONu8qv0INDoEThm9&oh=00_AYCIF9CnLK-T_DUV4z6FCozLTB42JLdB228GFXmHZZZ4rA&oe=672BDAA4",
  },
  {
    id: 7,
    name: "مزرعة الجبل",
    location: "مادبا",
    price: 85,
    description: "مزرعة تقع على تلة تطل على مناظر خلابة.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t39.30808-6/447246628_459011213430106_690070129611732651_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Nn2rEqjxbtYQ7kNvgEn9NeZ&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=A2TqfKb5fDbG6DuZq6MFvMm&oh=00_AYDPkEmFCl5hCfOZtaVGqpRCVu8ldVBZb19DgDBRrP2k2Q&oe=672BBE5C",
  },
  {
    id: 8,
    name: "مزرعة الأمل",
    location: "السلط",
    price: 70,
    description: "مزرعة صغيرة وجميلة لقضاء عطلة نهاية الأسبوع.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t39.30808-6/343443406_217446007649962_4451369968067542433_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=2285d6&_nc_ohc=fBmbf2ze3LcQ7kNvgHRJ_Y0&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=Af5sPtz8JW3DixTIkrgYkLV&oh=00_AYAxNgOSjDO1tXAoWHDYMxO5LyEljtVpuxnVFa9RsBHL9g&oe=672BC816",
  },
  {
    id: 9,
    name: "مزرعة الصحوة",
    location: "الطفيلة",
    price: 95,
    description: "مزرعة واسعة مع أنشطة ترفيهية متعددة.",
    image:
      "https://opensooq-images.os-cdn.com/previews/2048x0/cd/93/cd9309e9e50aec230b5e6471bcd29a0ee841493e29997aaf1d3dc011944975f7.jpg.webp",
  },
  {
    id: 10,
    name: "مزرعة البركة",
    location: "المفرق",
    price: 130,
    description: "مزرعة تحتوي على بركة سباحة، مثالية للصيف.",
    image:
      "https://scontent.famm13-1.fna.fbcdn.net/v/t39.30808-6/327215321_8884664551606419_8841796030453017367_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hwWLoPE63OcQ7kNvgEbK1Ta&_nc_zt=23&_nc_ht=scontent.famm13-1.fna&_nc_gid=AztNxloNWwvH_-G8867pycn&oh=00_AYBPC5PYcF3pmoO3azBcKsZ2O2ZnawUgsEvgnoZ1DtKbZw&oe=672BB712",
  },
  {
    id: 11,
    name: "مزرعة الخضراء",
    location: "عمان",
    price: 140,
    description: "مزرعة حديثة مع حدائق متنوعة ونباتات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_cb7d70bf-42fc-4f68-8f84-5f8f0b2608ab.jpg?v=1644606261",
  },
  {
    id: 12,
    name: "مزرعة الشمس",
    location: "إربد",
    price: 100,
    description: "مزرعة جميلة تحت أشعة الشمس، مثالية للنزهات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_2ab9a131-85b6-40aa-9ab4-c96c7686c383.jpg?v=1644606261",
  },
  {
    id: 13,
    name: "مزرعة الشمس",
    location: "إربد",
    price: 100,
    description: "مزرعة جميلة تحت أشعة الشمس، مثالية للنزهات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_2ab9a131-85b6-40aa-9ab4-c96c7686c383.jpg?v=1644606261",
  },
  {
    id: 14,
    name: "مزرعة الكرك",
    location: "الكرك",
    price: 100,
    description: "مزرعة جميلة تحت أشعة الشمس، مثالية للنزهات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_2ab9a131-85b6-40aa-9ab4-c96c7686c383.jpg?v=1644606261",
  },
  {
    id: 15,
    name: "مزرعة الرمان",
    location: "الكرك",
    price: 90,
    description: "مزرعة جميلة تحت أشعة الشمس، مثالية للنزهات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_2ab9a131-85b6-40aa-9ab4-c96c7686c383.jpg?v=1644606261",
  },
  {
    id: 16,
    name: "مزرعة الزمان",
    location: "الكرك",
    price: 200,
    description: "مزرعة جميلة تحت أشعة الشمس، مثالية للنزهات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_2ab9a131-85b6-40aa-9ab4-c96c7686c383.jpg?v=1644606261",
  },

  {
    id: 17,
    name: "مزرعة الزمان",
    location: "معان",
    price: 200,
    description: "مزرعة جميلة تحت أشعة الشمس، مثالية للنزهات.",
    image:
      "https://yallafarm.com/cdn/shop/products/image_2ab9a131-85b6-40aa-9ab4-c96c7686c383.jpg?v=1644606261",
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search); //من مكتبة  للحصول على المسار الحالي.  react-router-dom
}
// قراءة بيانات المحافظة من الرابط
function FarmList() {
  const query = useQuery();
  const province = query.get("province"); // الحصول على المحافظة من الـ URL
  const [selectedPrice, setSelectedPrice] = useState(0); // السعر الافتراضي صفر

  // تصفية المزارع بناءً على المحافظة والسعر
  const filteredFarms = farms.filter((farm) => {
    const isLocationMatch = province ? farm.location === province : true; // إذا لم يكن هناك محافظة، سيتم عرض جميع المزارع
    const isPriceMatch = selectedPrice === 0 || farm.price <= selectedPrice; // مقارنة السعر كرقم
    return isLocationMatch && isPriceMatch;
  });

  return (
    <div className="container">
      <h2>المزارع المتاحة</h2>

      {/*  التمرير لتحديد السعر */}
      <label
        htmlFor="priceFilter"
        className="price-slider"
        style={{ color: "white" }}
      >
        اختيار السعر ( {selectedPrice} دينار)
      </label>
      <input
        type="range"
        id="priceFilter"
        min="0"
        max="500"
        step="10"
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(Number(e.target.value))}
        className="price-slider"
      />
      <span style={{ color: "white", visibility: "hidden" }}>
        {" "}
        {selectedPrice} JD
      </span>

      {filteredFarms.length > 0 ? (
        <ul className="farm-list">
          {filteredFarms.map((farm) => (
            <li key={farm.id}>
              <Link to={`/farm/${farm.id}`}>
                {farm.name} - {farm.location} - {farm.price} دينار
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "white" }}>لا توجد مزارع متاحة بالسعر المحدد</p>
      )}
    </div>
  );
}

export default FarmList;
