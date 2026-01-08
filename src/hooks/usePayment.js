// src/hooks/usePayment.js
import { useState } from 'react';

const paymentApi = import.meta.env.VITE_payment_api

if (!paymentApi) {
  throw new Error('VITE_payment_api environment variable is required but not configured');
}

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = async ({ fullName, email, service, amount, message, fullAmount, }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(paymentApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          service,
          amount,
          message,
         fullAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to start payment');
      }

      // Redirect to Flutterwave checkout
      window.location.href = data.payment_link;
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return {
    initiatePayment,
    isLoading,
    error,
    setError,
  };
};