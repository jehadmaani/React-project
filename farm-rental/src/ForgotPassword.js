import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3008/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("حدث خطأ أثناء استعادة كلمة المرور.");
    }
  };

  return (
    <div>
      <h2>استعادة كلمة المرور</h2>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">البريد الإلكتروني:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">إرسال</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
