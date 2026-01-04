// src/pages/PaymentResult.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');
  const tx_ref = query.get('tx_ref');

  useEffect(() => {
    // Optional: log or send analytics
    console.log('Payment result:', { status, tx_ref });
  }, [status, tx_ref]);

  const isSuccess = status === 'successful';

  return (
    <div className="min-h-screen bg-dkblack flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className={`text-5xl font-bold mb-8 ${isSuccess ? 'text-goldmaize' : 'text-lite-gray'}`}>
          {isSuccess ? 'Payment Successful! 🎉' : 'Payment Cancelled'}
        </h1>
        <p className="text-2xl text-lite-gray mb-10 max-w-2xl mx-auto">
          {isSuccess 
            ? 'Thank you for your payment! I\'ll reach out soon to discuss your project and next steps.'
            : 'No worries — your card wasn\'t charged. Feel free to try again or contact me directly.'
          }
        </p>
        {tx_ref && (
          <p className="text-lite-gray mb-8">
            Transaction Reference: <span className="text-goldmaize font-mono">{tx_ref}</span>
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