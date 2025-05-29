import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Booking.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import farm1 from "./ph1.jpeg";
import farm2 from "./ph2.jpeg";
import farm3 from "./ph3.jpeg";
import axios from "axios";

function Booking() {
  const { id } = useParams();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    paypalEmail: "",
    payoneerEmail: "",
    method: "creditCard",
  });

  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const farmData = {
    1: {
      name: "مزرعة الهدوء",
      location: "عمان",
      images: [farm1, farm2, farm3],
    },
    2: {
      name: "مزرعة السعادة",
      location: "الزرقاء",
      images: [farm1, farm2, farm3],
    },
    3: {
      name: "مزرعة الأحلام",
      location: "إربد",
      images: [farm1, farm2, farm3],
    },
    4: {
      name: "مزرعة الريف",
      location: "جرش",
      images: [farm1, farm2, farm3],
    },
    5: {
      name: "مزرعة النسيم",
      location: "الكرك",
      images: [farm1, farm2, farm3],
    },
    6: {
      name: "مزرعة الوادي",
      location: "عجلون",
      images: [farm1, farm2, farm3],
    },
    7: {
      name: "مزرعة الجبل",
      location: "مادبا",
      images: [farm1, farm2, farm3],
    },
    8: {
      name: "مزرعة الأمل",
      location: "السلط",
      images: [farm1, farm2, farm3],
    },
    9: {
      name: "مزرعة الصحوة",
      location: "الطفيلة",
      images: [farm1, farm2, farm3],
    },
    10: {
      name: "مزرعة البحر",
      location: "العقبة",
      images: [farm1, farm2, farm3],
    },
    11: {
      name: "مزرعة البحر",
      location: "العقبة",
      images: [farm1, farm2, farm3],
    },
    12: {
      name: "مزرعة البحر",
      location: "العقبة",
      images: [farm1, farm2, farm3],
    },
    13: {
      name: "مزرعة البحر",
      location: "العقبة",
      images: [farm1, farm2, farm3],
    },
    14: {
      name: "مزرعة الكرك",
      location: "الكرك",
      images: [farm1, farm2, farm3],
    },
    15: {
      name: "مزرعة الرمان",
      location: "الكرك",
      images: [farm1, farm2, farm3],
    },
    16: {
      name: "مزرعة الزمان",
      location: "الكرك",
      images: [farm1, farm2, farm3],
    },
  };
  const farm = farmData[id];

  const handleMapClick = (event) => {
    event.stopPropagation();
    setIsMapExpanded(true);
  };

  const handleClickOutside = (event) => {
    if (isMapExpanded && !event.target.closest(".map-container")) {
      setIsMapExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMapExpanded]);

  const handlePaymentSubmit = async () => {
    if (paymentDetails.method === "creditCard") {
      alert("تم الدفع بواسطة بطاقة الائتمان");
    } else if (paymentDetails.method === "paypal") {
      if (!paymentDetails.paypalEmail) {
        alert("الرجاء إدخال البريد الإلكتروني لحساب باي بال.");
        return;
      }
      alert("تم الدفع بواسطة باي بال");
    } else if (paymentDetails.method === "payoneer") {
      if (!paymentDetails.payoneerEmail) {
        alert("الرجاء إدخال البريد الإلكتروني لحساب Payoneer.");
        return;
      }
      alert("تم الدفع بواسطة Payoneer");
    }

    // إرسال بيانات الدفع  
    try {
      await axios.post("http://localhost:3008/savePaymentData", {
        email:
          paymentDetails.paypalEmail ||
          paymentDetails.payoneerEmail ||
          "guest@example.com", // البريد الإلكتروني
        method: paymentDetails.method,
      });
      alert("تم حفظ بيانات الدفع بنجاح");
    } catch (error) {
      console.error("حدث خطأ أثناء حفظ بيانات الدفع:", error);
      alert("حدث خطأ أثناء حفظ البيانات.");
    }
  };

  return (
    <div className="booking-container">
      <div className={`farm-details ${isMapExpanded ? "hidden" : ""}`}>
        <h1>{farm.name}</h1>
        <p>{farm.location}</p>

        {/* الصور */}
        <div className="farm-images">
          {farm.images.map((image, index) => (
            <img
              key={index}
              className="farm-image"
              src={image}
              alt={`Farm ${index + 1}`}
            />
          ))}
        </div>

        {/* خيارات الدفع */}
        <div className="payment-options">
          <h3>خيارات الدفع</h3>

          {/* طريقة الدفع */}
          <div className="payment-method">
            <label>طريقة الدفع</label>
            <select
              value={paymentDetails.method}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  method: e.target.value,
                })
              }
            >
              <option value="creditCard">بطاقة ائتمان</option>
              <option value="paypal">باي بال</option>
              <option value="payoneer">بايونير</option>
            </select>
          </div>

          {/* بطاقة الدفع */}
          {paymentDetails.method === "creditCard" && (
            <>
              <div className="form-group">
                <label>رقم البطاقة</label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 12);
                    const formattedValue = value.replace(
                      /(\d{4})(?=\d)/g,
                      "$1-"
                    );
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: formattedValue,
                    });
                  }}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                />
              </div>
              <div className="form-group">
                <label>اسم صاحب البطاقة</label>
                <input
                  type="text"
                  value={paymentDetails.cardHolder}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^a-zA-Zأ-ي\s]/g, "")
                      .slice(0, 30);
                    setPaymentDetails({
                      ...paymentDetails,
                      cardHolder: value,
                    });
                  }}
                  placeholder="اسم صاحب البطاقة"
                />
              </div>

              <div className="form-group">
                <label>تاريخ انتهاء البطاقة</label>
                <input
                  type="month"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>رمز CVV</label>
                <input
                  type="text"
                  value={paymentDetails.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setPaymentDetails({
                      ...paymentDetails,
                      cvv: value,
                    });
                  }}
                  placeholder="XXX"
                />
              </div>
            </>
          )}

          {/* باي بال */}
          {paymentDetails.method === "paypal" && (
            <div className="paypal-section">
              <div className="paypal-header">
                <img
                  src="https://qpro.nl/wp-content/uploads/2024/02/Paypal_2014_logo-e1708092007619.png.webp"
                  alt="PayPal Logo"
                  className="paypal-logo"
                />
                <h4>دفع عبر باي بال</h4>
              </div>
              <div className="form-group">
                <label>البريد الإلكتروني لحساب باي بال</label>
                <input
                  type="email"
                  value={paymentDetails.paypalEmail}
                  onChange={(e) => {
                    setPaymentDetails({
                      ...paymentDetails,
                      paypalEmail: e.target.value,
                    });
                  }}
                  placeholder="البريد الإلكتروني لحساب باي بال"
                  required
                />
              </div>
            </div>
          )}

          {/* Payoneer */}
          {paymentDetails.method === "payoneer" && (
            <div className="payoneer-section">
              <div className="payoneer-header">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9panPGixQ1Y7B-0t36EjxyosyaXHC9C1sSg&s"
                  alt="Payoneer Logo"
                  className="payoneer-logo"
                />
                <h4>دفع عبر Payoneer</h4>
              </div>
              <div className="form-group">
                <label>البريد الإلكتروني لحساب Payoneer</label>
                <input
                  type="email"
                  value={paymentDetails.payoneerEmail}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      payoneerEmail: e.target.value,
                    })
                  }
                  placeholder="البريد الإلكتروني لحساب Payoneer"
                  required
                />
              </div>
            </div>
          )}

          <button onClick={handlePaymentSubmit} className="payment-submit-btn">
            تأكيد الدفع
          </button>
        </div>
      </div>

      {/* خريطة */}
      <div
        className={`map-container ${isMapExpanded ? "expanded" : ""}`}
        onClick={handleMapClick}
      >
        <MapContainer center={[31.559, 35.4732]} zoom={13} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[31.9539, 35.9106]}>
            <Popup>مكان المزرعة هنا</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Booking;
