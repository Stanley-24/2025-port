// src/components/Payment/CheckoutModal.jsx
import { useState } from 'react';
import { usePayment } from '../../hooks/usePayment';

const CheckoutModal = ({ isOpen, onClose, service, amount }) => {
  const { initiatePayment, isLoading, error } = usePayment();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '', // New field
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    initiatePayment({
      fullName: formData.fullName,
      email: formData.email,
      service,
      amount,
      message: formData.message, // Send message to backend
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-dkblack border-2 border-goldmaize rounded-xl max-w-md w-full p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-goldmaize text-center mb-6">
          Checkout
        </h2>
        <p className="text-xl text-center text-lite-gray mb-6">
          {service}
        </p>
        <p className="text-2xl font-bold text-goldmaize text-center mb-8">
          ₦{amount.toLocaleString()}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lite-gray mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-goldmaize focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-lite-gray mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-goldmaize focus:outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-lite-gray mb-2">
              Message / Instructions (Optional)
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-goldmaize focus:outline-none resize-none"
              placeholder="Any specific requirements, timeline, or details you'd like me to know?"
            />
            <p className="text-sm text-lite-gray mt-1">
              Help me understand your vision better!
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-center bg-red-900 bg-opacity-30 py-3 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold hover:bg-purple text-black font-bold py-4 rounded-full text-lg transition disabled:opacity-70"
          >
            {isLoading ? 'Processing...' : 'Pay with Flutterwave'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-lite-gray hover:text-goldmaize mt-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;