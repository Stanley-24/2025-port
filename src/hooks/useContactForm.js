// hooks/useContactForm.js
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_KEY;

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

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Server returned non-JSON (likely HTML error page)
        data = { success: false, message: "Server error. Please try again later." };
      }

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