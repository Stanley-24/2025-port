// hooks/useContactForm.js
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;


export const useContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({}); 
  const [notification, setNotification] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field as user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setNotification(null);
    setFieldErrors({}); // Clear previous field errors

      // Optional runtime safety check (only in development)
      if (!apiUrl) {
        console.error("API_URL is missing! Set VITE_API_URL in your env file");
        setNotification({
          title: "Dev Error",
          message: "Contact form endpoint not set.",
          isSuccess: false,
          isError: true,
        });
        setIsSending(false);
        return;
      }

    try {
      const response = await fetch(apiUrl, {
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

      let data = { success: false, message: "Server error. Please try again later." };

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok && data.success) {
        setNotification({
          title: "Success!",
          message: data.message || "Your message was sent successfully. I'll be in touch soon.",
          isSuccess: true,
          isError: false,
        });
        setFormData({ fullname: "", email: "", subject: "", message: "" });
        setFieldErrors({});
      } else {
        // Handle validation errors from server
        let hasFieldErrors = false;

        if (data.errors && typeof data.errors === "object") {
          // Map server error keys to form field names if needed
          // Example: server might return "fullName", but your form uses "fullname"
          const mappedErrors = {};
          
          if (data.errors.fullName) mappedErrors.fullname = data.errors.fullName;
          if (data.errors.email) mappedErrors.email = data.errors.email;
          if (data.errors.subject) mappedErrors.subject = data.errors.subject;
          if (data.errors.message) mappedErrors.message = data.errors.message;

          setFieldErrors(mappedErrors);
          hasFieldErrors = Object.keys(mappedErrors).length > 0;
        }

        // Fallback notification (only if no inline errors shown)
        const errorMessage = hasFieldErrors
          ? null // Don't show toast if inline errors are visible
          : data.message || "Failed to send message. Please try again.";

        if (errorMessage) {
          setNotification({
            title: "Error!",
            message: errorMessage,
            isSuccess: false,
            isError: true,
          });
        }
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
    fieldErrors, // ← Export this!
    isSending,
    notification,
    handleChange,
    handleSubmit,
    closeNotification,
  };
};