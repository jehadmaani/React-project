const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // من POST لل Json
const cors = require("cors"); // تسمح للطلبات لتوصل على server

const app = express();
const PORT = 3008;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// إعداد اتصال MongoDB
mongoose
  .connect("mongodb://localhost:27017/farmRental", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successful Connected with MongoDB"))
  .catch((error) => console.error("Faild Connection", error));

// نموذج المزرعة
const farmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: String, required: true },
  phone: { type: String, required: true },
  area: { type: String, required: true },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  // averageRating: { type: Number, default: 0 }, // متوسط التقييمات
});

const Farm = mongoose.model("Farm", farmSchema);

//  المستخدم
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// نقطة نهاية تسجيل الحساب
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, birthdate, gender } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      birthdate,
      gender,
    });
    await newUser.save();
    res.status(201).json({ message: "تم إنشاء الحساب بنجاح!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "حدث خطأ أثناء إنشاء الحساب." });
  }
});

// نقطة نهاية تسجيل الدخول
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // البحث  بواسطة البريد الإلكتروني
    const user = await User.findOne({ email });

    // التحقق من صحة البريد الإلكتروني وكلمة المرور
    if (!user || user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      });
    }

    // إرجاع بيانات المستخدم في  حالة تسجيل الدخول
    res.json({ success: true, user });
  } catch (error) {
    console.error("حدث خطأ في عملية تسجيل الدخول:", error);
    res.status(500).json({ success: false, message: "حدث خطأ في الخادم." });
  }
});

// للتقيم اذا تمت العملية او using S 
app.post("/rateFarm", async (req, res) => {
  const { farmId, userId, rating } = req.body;

  try {
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ message: "المزرعة غير موجودة" });
    }

    // إضافة التقييم للمزرعة
    farm.ratings.push({ user: userId, rating });

    // ************for Deplyed
    const totalRatings = farm.ratings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    farm.averageRating = totalRatings / farm.ratings.length;

    await farm.save();
    res.json({ message: "تم إضافة التقييم بنجاح!" });
  } catch (error) {
    console.error("حدث خطأ في إضافة التقييم:", error);
    res.status(500).json({ message: "حدث خطأ في الخادم." });
  }
});

//payment details to save
// نموذج الدفع
const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  method: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

//  endPoint لحفظ بيانات الدفع
app.post("/savePaymentData", async (req, res) => {
  const { email, method } = req.body;

  try {
    const newPayment = new Payment({
      email,
      method,
    });

    await newPayment.save();
    res.status(201).json({ message: "تم حفظ بيانات الدفع بنجاح!" });
  } catch (error) {
    console.error("حدث خطأ أثناء حفظ بيانات الدفع:", error);
    res.status(500).json({ message: "حدث خطأ أثناء حفظ البيانات." });
  }
});

//  starting the server 
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
