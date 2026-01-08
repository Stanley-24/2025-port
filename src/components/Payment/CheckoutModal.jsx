// src/components/Payment/CheckoutModal.jsx
import { useState } from 'react';
import { usePayment } from '../../hooks/usePayment';

const CheckoutModal = ({ isOpen, onClose, service, amount, fullAmount, displayPrice }) => {
  const { initiatePayment, isLoading, error } = usePayment();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
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
      message: formData.message,
      fullAmount,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-dkblack border-r-2 border-l-2 border-goldmaize rounded-xl max-w-md w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-6 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-goldmaize text-center mb-3">
            Checkout
          </h2>
          <p className="text-lg md:text-xl text-center text-lite-gray mb-2">
            {service}
          </p>
          <p className="text-center text-lite-gray text-sm mb-4">
            Full Price: {displayPrice}
          </p>
          <p className="text-2xl font-bold text-goldmaize text-center mb-6">
            Deposit Due Now (70%): ₦{amount.toLocaleString()}
          </p>
          <p className="text-center text-lite-gray text-sm mb-6">
            Remaining 30% invoiced before final delivery
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-lite-gray mb-1 text-sm">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-goldmaize focus:outline-none text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-lite-gray mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-goldmaize focus:outline-none text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-lite-gray mb-1 text-sm">
                Message / Instructions (Optional)
              </label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-goldmaize focus:outline-none resize-none text-sm"
                placeholder="Any specific requirements or timeline?"
              />
              <p className="text-xs text-lite-gray mt-1">
                Help me understand your vision!
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-center bg-red-900 bg-opacity-30 py-2 rounded-lg text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-purple text-black font-bold py-3.5 rounded-full text-lg transition disabled:opacity-70"
            >
              {isLoading ? 'Processing...' : 'Pay Deposit with Flutterwave'}
            </button>
          </form>
        </div>

        {/* Fixed Cancel Button at Bottom */}
        <div className="p-6 pt-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full text-lite-gray hover:text-goldmaize text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;