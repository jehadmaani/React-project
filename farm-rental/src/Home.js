import React, { useEffect } from "react";
import "./Home.css";
import FarmsVideo from "./zzNe.mp4";
function Home() {
  useEffect(() => {
    document.body.style.background = "none"; // إزالة الخلفية العامة
  }, []);

  return (
    <div className="home-container">
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
  );
}

export default Home;
