// src/pages/PaymentResult.jsx
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');
  const tx_ref = query.get('tx_ref');

  const isSuccess = status === 'successful' || status === 'completed';
  const isCancelled = status === 'cancelled';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div 
          className="bg-[#1A1A1A] border-4 border-[#F2CA46] rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {isSuccess ? (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2CA46] text-center mb-8 animate-pulse">
                Deposit Received! 🎉
              </h1>
              <p className="text-xl md:text-2xl text-[#f8f8f8] text-center mb-6">
                Thank you for your 70% deposit!
              </p>
              <p className="text-lg md:text-xl text-[#E6BD37] text-center mb-10">
                I'll be in touch within 24 hours to confirm details<br className="hidden md:block" />
                and start your project.
              </p>
              {tx_ref && (
                <div className="mb-10 text-center">
                  <p className="text-[#d1d5db] mb-2">Transaction Reference:</p>
                  <p className="text-2xl md:text-3xl font-mono text-[#F2CA46]">
                    {tx_ref}
                  </p>
                </div>
              )}
              <p className="text-lg text-[#d1d5db] text-center mb-12">
                The remaining 30% will be invoiced before final delivery.
              </p>
            </>
          ) : isCancelled ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-[#d1d5db] text-center mb-8">
                Payment Cancelled
              </h1>
              <p className="text-xl text-[#f8f8f8] text-center mb-12">
                No worries — your card wasn't charged.<br className="hidden md:block" />
                Feel free to try again or contact me directly.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-[#c60ff0] text-center mb-8">
                Payment Failed
              </h1>
              <p className="text-xl text-[#f8f8f8] text-center mb-12">
                Something went wrong. Please try again or reach out.
              </p>
            </>
          )}

          <div className="text-center">
            <a 
              href="/" 
              className="inline-block px-10 py-5 rounded-full text-xl md:text-2xl font-bold transition transform hover:scale-105"
              style={{ 
                backgroundColor: '#ab8000',
                color: '#000000'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c60ff0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ab8000'}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;