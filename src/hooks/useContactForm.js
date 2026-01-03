// hooks/useContactForm.js
import { useState } from "react";

const API_URL = "https://stanley-portfolio-2026.onrender.com/api/v1/contact";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setNotification(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullname,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setNotification({
          title: "Success!",
          message: data.message || "Your message was sent successfully. I'll be in touch soon.",
          isSuccess: true,
          isError: false,
        });
        setFormData({ fullname: "", email: "", subject: "", message: "" });
      } else {
        setNotification({
          title: "Error!",
          message: data.message || data.details || "Failed to send message. Please try again.",
          isSuccess: false,
          isError: true,
        });
      }
    } catch (error) {
      setNotification({
        title: "Error!",
        message: "Network error. Please check your connection and try again.",
        isSuccess: false,
        isError: true,
      });
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSending(false);
    }
  };

  const closeNotification = () => setNotification(null);

  return {
    formData,
    isSending,
    notification,
    handleChange,
    handleSubmit,
    closeNotification,
  };
};