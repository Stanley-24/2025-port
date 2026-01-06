// src/pages/PaymentResult.jsx
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');

  const isSuccess = status === 'successful';

  return (
    <div className="min-h-screen bg-dkblack flex items-center justify-center text-center px-4">
      <div>
        <h1 className={`text-5xl font-bold mb-8 ${isSuccess ? 'text-goldmaize' : 'text-lite-gray'}`}>
          {isSuccess ? 'Deposit Received! 🎉' : 'Payment Cancelled'}
        </h1>
        <p className="text-2xl text-lite-gray mb-10 max-w-2xl mx-auto">
          {isSuccess 
            ? "Thank you for your 70% deposit! I'll reach out soon to confirm details and start your project."
            : "No problem — you can try again anytime or contact me directly."
          }
        </p>
        {isSuccess && (
          <p className="text-lg text-lite-gray mb-10">
            The remaining 30% will be invoiced before final delivery.
          </p>
        )}
        <a 
          href="/" 
          className="inline-block bg-gold hover:bg-purple text-black font-bold py-4 px-10 rounded-full text-xl transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentResult;